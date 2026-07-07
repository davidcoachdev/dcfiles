---
name: flashdb
description: "Trigger: FlashDB, base de datos embebida, KVDB, TSDB, FAL, embedded database, IoT database. Integrar y usar FlashDB en proyectos embebidos en C."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# FlashDB Skill

## Activation Contract

Usá esta skill cuando:
- Integres FlashDB en un proyecto embebido (bare metal, RT-Thread, FreeRTOS, Zephyr)
- Necesités portar FlashDB a una nueva plataforma o microcontrolador
- Estés diseñando el esquema de almacenamiento KV o time series
- Optimices el uso de Flash (wear leveling, sectores, tamaño de bloque)
- Investigués errores de inicialización, escritura o formato de FlashDB

## Hard Rules

- **NO** modifiques el código fuente de FlashDB (`src/` o `inc/`). La integración se hace por configuración (`fdb_cfg.h`) y adaptación de FAL.
- **Siempre** definí `FDB_WRITE_GRAN` según el flash: 1 (NOR), 8 (STM32F2/F4), 32 (STM32F1), 64 (STM32L4). Usar el valor incorrecto causa corrupción de datos silenciosa.
- **Siempre** configurá `FAL_PART_TABLE` con particiones que no se solapen ni excedan el device flash.
- **Nunca** llamés a `fdb_kv_set` o `fdb_tsl_append` antes de inicializar el db con `fdb_kvdb_init` / `fdb_tsdb_init`.
- **Siempre** verificá el return `FDB_NO_ERR` después de operaciones de escritura. Ignorar errores puede perder datos sin warning.

## Decision Gates

| Situación | Elección |
|-----------|----------|
| Almacenar config de producto, parámetros, preferencias de usuario | **KVDB** (`FDB_USING_KVDB`) |
| Log de sensores, eventos temporizados, métricas en el tiempo | **TSDB** (`FDB_USING_TSDB`) |
| Plataforma con RT-Thread | **FAL mode** (`FDB_USING_FAL_MODE`) |
| Linux/POSIX o sistema con filesystem | **File mode** (`FDB_USING_FILE_POSIX_MODE` o `FDB_USING_FILE_LIBC_MODE`) |
| Bare metal + flash directo | **FAL mode** (portar FAL sin RT-Thread) |
| KV > sector size (ej. 10KB) | Usar `fdb_kvdb_control(..., FDB_KVDB_CTRL_SET_SEC_SIZE, ...)` ANTES de init |
| Necesitás borrar datos viejos automáticamente en TSDB | Habilitar rollover con `FDB_TSDB_CTRL_SET_ROLLOVER` |
| Actualizar firmware y migrar KV existentes | Habilitar `FDB_KV_AUTO_UPDATE` + manejar `fdb_kvdb.ver_num` |

## Execution Steps

### 1. Portear FAL (si usás FAL mode)

1. Definí el device flash con `struct fal_flash_dev` — implementá `init` (opcional), `read`, `write`, `erase`.
2. Creá `fal_cfg.h` con la flash device table (`FAL_FLASH_DEV_TABLE`) y partition table (`FAL_PART_TABLE`).
3. Cada base de datos FlashDB ocupa UNA partición FAL.

**Ejemplo device flash (STM32F4 on-chip):**
```c
const struct fal_flash_dev stm32f4_onchip_flash = {
    .name       = "stm32_onchip",
    .addr       = 0x08000000,
    .len        = 1024 * 1024,
    .blk_size   = 128 * 1024,
    .ops        = {init, read, write, erase},
    .write_gran = 8
};
```

**Ejemplo partition table:**
```c
#define FAL_PART_TABLE \
{ \
    {FAL_PART_MAGIC_WORD, "kvdb",    "stm32_onchip", 0, 128*1024, 0}, \
    {FAL_PART_MAGIC_WORD, "tsdb",    "stm32_onchip", 128*1024, 256*1024, 0}, \
}
```

### 2. Configurar FlashDB

Creá o modificá `fdb_cfg.h`:

```c
#define FDB_USING_KVDB             1   // Habilitar KVDB
#define FDB_USING_TSDB             1   // Habilitar TSDB
#define FDB_USING_FAL_MODE         1   // Usar FAL mode (o file mode)
#define FDB_WRITE_GRAN             8   // STM32F4: 8 bit
// #define FDB_BIG_ENDIAN            // Solo si MCU es big-endian
#define FDB_PRINT(...)             printf(__VA_ARGS__)
```

### 3. Inicializar y usar KVDB

```c
#include "flashdb.h"

static fdb_kvdb_t kvdb;

// Default KV (se escriben en primera inicialización)
static struct fdb_default_kv default_kv[] = {
    {"boot_count", "0"},
    {"device_name", "sensor-node-1"},
};

void kvdb_init(void) {
    fdb_err_t ret = fdb_kvdb_init(kvdb, "my_kvdb", "kvdb_partition",
                                   default_kv, NULL);
    if (ret != FDB_NO_ERR) { /* manejar error */ }
}

// Set KV
int boot_count = 5;
fdb_kv_set_blob(kvdb, "boot_count",
                fdb_blob_make(&blob, &boot_count, sizeof(boot_count)));

// Get KV (blob)
int value = 0;
fdb_blob_make(&blob, &value, sizeof(value));
fdb_kv_get_blob(kvdb, "boot_count", &blob);

// Get KV (string)
char *val = fdb_kv_get(kvdb, "device_name");
// NOTA: no reentrante, usar strdup si se necesita persistencia

// Delete KV
fdb_kv_del(kvdb, "boot_count");

// Iterar todas las KVs
fdb_kv_iterator_t itr = fdb_kv_iterator_init(kvdb, &itr);
while (fdb_kv_iterate(kvdb, &itr)) {
    printf("key: %s\n", itr.kv->key);
}
```

### 4. Inicializar y usar TSDB

```c
static fdb_tsdb_t tsdb;

// Función que devuelve timestamp
fdb_time_t get_timestamp(void) {
    return time(NULL);  // o HAL_GetTick() en bare metal
}

void tsdb_init(void) {
    fdb_err_t ret = fdb_tsdb_init(tsdb, "my_tsdb", "tsdb_partition",
                                   get_timestamp, 128, NULL);
    if (ret != FDB_NO_ERR) { /* manejar error */ }
}

// Append TSL
typedef struct {
    float temperature;
    float humidity;
} sensor_data_t;

sensor_data_t data = {25.3, 60.1};
fdb_tsl_append(tsdb, fdb_blob_make(&blob, &data, sizeof(data)));

// Iterar por rango de tiempo
fdb_tsl_iter_by_time(tsdb, from_time, to_time, callback, NULL);

// Callback de iteración
static void tsl_cb(fdb_tsl_t tsl, void *arg) {
    struct fdb_blob blob;
    sensor_data_t data;
    fdb_tsl_to_blob(tsl, fdb_blob_make(&blob, &data, sizeof(data)));
    fdb_blob_read(&blob);
    printf("temp: %.1f, hum: %.1f\n", data.temperature, data.humidity);
}

// Query count
size_t count = fdb_tsl_query_count(tsdb, from, to, FDB_TSL_UNUSED);
```

### 5. Manejo de errores comunes

| Error | Causa probable | Solución |
|-------|---------------|----------|
| `FDB_ERASE_ERR` | Flash no soporta erase en ese offset | Verificar `fal_flash_dev.ops.erase` |
| `FDB_READ_ERR` | Offset fuera de rango | Revisar tamaño de partición FAL |
| `FDB_WRITE_ERR` | Write granularity incorrecta | Ajustar `FDB_WRITE_GRAN` en `fdb_cfg.h` |
| `FDB_SAVED_FULL` | KVDB sin espacio | Aumentar sector size vía `FDB_KVDB_CTRL_SET_SEC_SIZE` |
| Init devuelve error | Partición FAL no encontrada | Verificar nombre en `FAL_PART_TABLE` |

## Output Contract

Al completar una tarea con FlashDB devolver:
- Archivos creados/modificados: `fdb_cfg.h`, `fal_cfg.h`, device flash ports, código de aplicación
- Configuración de `FDB_WRITE_GRAN` usada y por qué
- Modo de almacenamiento elegido (FAL vs file mode, KVDB vs TSDB) con justificación
- Cualquier ajuste de sector size o rollover configurado
- Errores encontrados durante porting/integración y cómo se resolvieron

## References

- `inc/flashdb.h` — API pública de FlashDB
- `inc/fdb_cfg.h` — Template de configuración
- `demos/` — Ejemplos de plataforma (STM32, ESP8266, Linux)
- `samples/` — Ejemplos de uso KVDB y TSDB
- `port/fal/` — Port de FAL (Flash Abstraction Layer)
- Documentación online: https://armink.github.io/FlashDB
- Repositorio: https://github.com/armink/FlashDB
