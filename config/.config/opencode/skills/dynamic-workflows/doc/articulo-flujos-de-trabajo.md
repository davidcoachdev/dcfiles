# Un arnés para cada tarea: flujos de trabajo dinámicos en Claude Code

**Autor**: Thariq Shihipar y Sid Bidasaria (@sidbid), Anthropic  
**Fuente**: Blog de Anthropic / Claude Blog  

---

La semana pasada lanzamos **flujos de trabajo dinámicos** en Claude Code. Claude ahora puede escribir su propio código, aprovechar diseñados sobre la marcha y fabricados a medida para la tarea en cuestión.

Aunque el arnés predeterminado de Claude Code está diseñado para la codificación, también es útil para muchos otros tipos de tareas porque, como resulta, muchas tareas se asemejan a las tareas de codificación. Pero hay ciertas clases de tareas en las que hemos tenido que crear arneses personalizados sobre Claude Code para lograr el máximo rendimiento, como por ejemplo: **Investigación**, **análisis de seguridad**, **equipos de agentes**, o **Revisión de código**.

Los flujos de trabajo permiten crear dinámicamente herramientas que posibilitan que Claude resuelva todos esos problemas, e incluso más, de forma nativa dentro de Claude Code. Además, puedes compartir y reutilizar estos flujos de trabajo con otros usuarios.

En este artículo, compartiré mis experiencias y aprendizajes iniciales sobre los flujos de trabajo para que puedas sacarles el máximo provecho.

Dicho esto, ¡las mejores prácticas aún están en desarrollo! Los flujos de trabajo dinámicos suelen usar más tokens, así que piense detenidamente cuándo y cómo usarlos.

> Nota: esta publicación también está disponible en el blog de Claude.

## Ejemplos de prompts

Antes de adentrarnos en los detalles técnicos, me gustaría comenzar con algunos ejemplos para que reflexionen sobre las posibilidades que ofrecen los flujos de trabajo:

- "Esta prueba falla quizás 1 de cada 50 ejecuciones. Configura un flujo de trabajo para reproducirla, formula teorías y pruébalas de forma adversaria en worktrees /goal no te detengas hasta que una teoría funcione."
- "Utilizando un flujo de trabajo, reviso mis últimas 50 sesiones y extraigo de ellas las correcciones que sigo realizando, y convierto las recurrentes en reglas de CLAUDE.md".
- "Utilice un flujo de trabajo para indagar a fondo #incidentes llevo seis meses usando Slack y encuentro causas recurrentes donde nadie ha reportado ningún problema."
- "Toma mi plan de negocios y ejecuta un flujo de trabajo donde diferentes agentes lo analicen minuciosamente desde la perspectiva de un inversor, un cliente y un competidor."
- "Aquí tienes una carpeta con 80 currículums. Utiliza un flujo de trabajo para clasificarlos según tu perfil para el puesto de desarrollador backend y revisa los diez mejores. Entrevístame utilizando la herramienta AskUserQuestion con una rúbrica."
- "Necesito un nombre para esta herramienta de línea de comandos. Utiliza un flujo de trabajo para generar ideas sobre varias opciones y organiza un torneo para elegir las 3 mejores."
- "Utilice un flujo de trabajo para cambiar el nombre de nuestro modelo de Usuario a Cuenta en todas partes."
- "Revisaré el borrador de mi publicación de blog y, utilizando un flujo de trabajo, verificaré cada afirmación técnica con respecto al código fuente; no quiero lanzar nada incorrecto."

## Cómo funcionan los flujos de trabajo dinámicos

Los flujos de trabajo dinámicos ejecutan un archivo javascript con algunas funciones especiales que ayudan a generar y coordinar **subagentes**.

Los flujos de trabajo dinámicos también incluyen funciones estándar de JavaScript como JSON, Math y Array, para ayudar a procesar los datos.

Resulta especialmente útil saber que los flujos de trabajo dinámicos pueden decidir qué modelos utiliza un agente y si los subagentes se ejecutan en su propio árbol de trabajo, lo que permite a Claude elegir el nivel de inteligencia y el aislamiento necesarios.

Si un flujo de trabajo se interrumpe, por ejemplo, por una acción del usuario o al cerrar la terminal, reanudar la sesión permitirá que el flujo de trabajo continúe desde donde se interrumpió.

## Por qué flujos de trabajo dinámicos

Cuando se le pide al entorno de desarrollo predeterminado de Claude Code que realice una tarea, necesita planificar y ejecutar en la misma ventana de contexto. Para muchas tareas de codificación, esto es muy eficaz, pero a veces puede fallar en tareas adversarias de larga duración, masivamente paralelas o altamente estructuradas.

Esto se debe a que cuanto más tiempo trabaja Claude en una tarea compleja en una sola ventana de contexto, más susceptible se vuelve a ciertos modos de fallo específicos:

| Falla | Descripción |
|-------|-------------|
| **Agent laziness** | Claude se detiene antes de terminar una tarea compleja con múltiples partes. Ej: aborda 20 de 50 items en una revisión de seguridad y declara terminado. |
| **Self-preference bias** | Tendencia a preferir sus propios resultados o hallazgos, especialmente cuando se le pide que los verifique o juzgue según una rúbrica. |
| **Goal drift** | Pérdida gradual de fidelidad al objetivo original a lo largo de muchos ciclos, especialmente después de compactación. Cada paso de resumen implica pérdidas de información. |

La creación de un flujo de trabajo ayuda a combatir estos problemas mediante la orquestación de distintos procesos (Claudes) con sus propias ventanas de contexto y objetivos específicos y aislados.

## Flujos de trabajo dinámicos vs estáticos

Es posible que anteriormente hayas creado un flujo de trabajo estático utilizando el SDK de Claude Agent o `claude -p` para coordinar varias instancias de Claude Code.

Pero debido a que los flujos de trabajo estáticos deben funcionar para todos los casos límite, suelen ser más genéricos. Con **Claude Opus 4.8** y sus flujos de trabajo dinámicos, Claude ahora es lo suficientemente inteligente como para escribir un arnés personalizado hecho a medida para su caso de uso.

## Patrones útiles

Puedes empezar a usar flujos de trabajo dinámicos simplemente pidiéndole a Claude que cree uno, o usando la palabra clave "ultracode" para asegurarte de que Claude Code cree un flujo de trabajo.

Pero crear un modelo mental de cómo funcionan los flujos de trabajo dinámicos te ayudará a comprender cuándo usarlos y cómo puedes guiar a Claude mediante indicaciones.

Existen algunos patrones comunes que Claude podría usar y combinar al crear flujos de trabajo:

### Clasificar y actuar

Utilice un agente clasificador para determinar el tipo de tarea y, a continuación, rediríjala a diferentes agentes o comportamientos según la tarea. O bien, utilice un clasificador al final para determinar el resultado.

### Expandir y sintetizar

Divide una tarea en muchos pasos más pequeños, ejecuta un agente en cada paso y luego sintetiza los resultados. Esto es especialmente útil cuando hay muchos pasos pequeños o cuando cada paso se beneficia de su propio contexto limpio para evitar interferencias o contaminación cruzada. El paso de síntesis actúa como una barrera: espera a que todos los agentes terminen de ejecutarse y luego combina sus resultados estructurados en un único resultado.

### Verificación adversaria

Para cada agente generado, ejecute un agente generado por separado para verificar de forma adversaria su resultado con respecto a una rúbrica o criterio.

### Generar y filtrar

Genera varias ideas sobre un tema y luego fíltralas mediante una rúbrica o verificación, elimina los duplicados y devuelve solo las ideas de mayor calidad y probadas.

### Torneo

En lugar de dividir el trabajo, haz que los agentes compitan entre sí. Crea N agentes que intenten la misma tarea utilizando diferentes enfoques. Luego, un agente evaluador juzga los resultados mediante indicaciones o modelos, comparándolos por pares, hasta que haya un ganador.

### Repetir hasta terminar

Para tareas con una cantidad de trabajo desconocida, se recomienda generar agentes en bucle hasta que se cumpla una condición de parada (que no haya nuevos hallazgos o que no haya más errores en los registros) en lugar de un número fijo de pasadas.

## Casos de uso

### Migraciones y refactorizaciones

Bollo fue reescrito de Zig a Rust usando flujos de trabajo. Puedes leer más sobre cómo se hizo eso en el hilo X de Jarred.

La clave está en dividir la tarea en una serie de pasos que requieren intervención, por ejemplo, puntos de llamada, pruebas fallidas, módulos, etc. Cree un subagente para cada corrección en un árbol de trabajo para realizar la corrección, luego haga que otro agente las revise de forma antagónica y las combine. Considere indicarle al agente que no utilice comandos que consuman muchos recursos para poder paralelizar al máximo sin agotar los recursos de su máquina.

### Investigación profunda

Se ha publicado una herramienta de investigación avanzada (/deep-research) en Claude Code que utiliza flujos de trabajo dinámicos. En concreto, realiza búsquedas web, recupera fuentes, verifica sus afirmaciones mediante métodos adversariales y sintetiza un informe con las referencias citadas.

Pero este tipo de investigación no se limita a simples búsquedas web. Por ejemplo, puedes pedirle a Claude que elabore un informe de estado a partir del contexto de Slack o que investigue cómo funciona una función analizando en profundidad el código fuente.

### Verificación profunda

Por otro lado, si tienes un informe en el que deseas verificar y citar cada afirmación fáctica a la que hace referencia, puedes generar un flujo de trabajo en el que un agente identifique todas las afirmaciones fácticas y, posteriormente, se cree un subagente para que las verifique en detalle. También podrías hacer que un agente de verificación revise al subagente de origen para asegurarse de que su fuente sea de alta calidad.

### Clasificación

Es posible que tengas una lista de elementos que quieras ordenar según alguna medida cualitativa que creas que Claude Code evalúa bien; por ejemplo: tickets de soporte ordenados por gravedad del error. Pero si intentas ordenar más de 1000 filas en una sola solicitud, la calidad se degrada y no se ajustará al contexto. En su lugar, ejecuta un torneo, una secuencia de agentes de comparación por pares (el juicio comparativo es más fiable que la puntuación absoluta) o una clasificación por rangos en paralelo y luego combina. Cada comparación es un agente independiente, por lo que el bucle determinista mantiene el cuadro y solo el orden de ejecución permanece en contexto.

### Memoria y cumplimiento de las normas

Si Claude no cumple con un conjunto específico de reglas o tiene dificultades con ellas, incluso después de haberlas incluido en el archivo CLAUDE.mds, cree un flujo de trabajo con una lista de reglas que los agentes verificadores deben revisar (un verificador por regla). Crear un subagente con perfil escéptico para revisar las reglas y asegurarse de que se ajustan a lo establecido ayudará a evitar demasiados falsos positivos.

La dirección inversa también funciona: extraiga de sus sesiones recientes y comentarios de revisión de código las correcciones que sigue haciendo, agrúpelas con agentes paralelos, verifique adversariamente cada candidato (¿esta regla habría evitado un error real?) y luego destile los supervivientes de nuevo en un CLAUDE.md.

### Investigación de la causa raíz

La depuración funciona mejor cuando se plantean varias hipótesis independientes y se ponen a prueba, pero si solo se utiliza una ventana de contexto, Claude puede incurrir en un sesgo de autopreferencia.

Un flujo de trabajo puede prevenir esto estructuralmente mediante la creación de agentes que generen hipótesis a partir de evidencia disjunta. Por ejemplo, agentes separados para registros, archivos y datos. Cada hipótesis puede ser evaluada por un panel de verificadores y refutadores.

Esto no se limita solo al código. Los flujos de trabajo se pueden utilizar para ventas (¿por qué cayeron las ventas en marzo?), ingeniería de datos (¿por qué falló este proceso?) o cualquier análisis posterior a un fallo.

### Clasificación de prioridades a gran escala

Cada equipo tiene una cola de soporte, informes de errores u otro tipo de tareas pendientes que no pueden ser procesadas completamente por humanos.

Un flujo de trabajo de triaje clasifica cada elemento, elimina los duplicados comparándolos con los que ya están registrados y toma medidas. Esto puede implicar intentar solucionar el problema o derivarlo a un usuario humano.

Un patrón útil para los flujos de trabajo de triaje es la **cuarentena**. Esto implica impedir que los agentes que leen contenido público no confiable realicen acciones con altos privilegios, las cuales son llevadas a cabo por los agentes encargados de procesar la información.

Combina los flujos de trabajo de triaje con /loop para que Claude lo haga de forma continua.

### Exploración y gusto

Los flujos de trabajo pueden ser útiles al explorar diferentes enfoques para una solución, especialmente cuando se basa en preferencias personales, como el diseño o la denominación, y se beneficiarían de una rúbrica.

Pídele a Claude que explore varias soluciones y proporciona a un revisor una rúbrica que defina qué constituye una buena solución. La tarea se considera completada cuando el revisor considera que cumple con los criterios. Las soluciones también pueden ordenarse o seleccionarse mediante un torneo basado en la rúbrica.

### Evaluaciones

Puedes realizar evaluaciones sencillas para tareas específicas creando agentes independientes en un árbol de trabajo y, a continuación, creando agentes de comparación para comparar y calificar los resultados según una rúbrica. Por ejemplo, evaluar y perfeccionar una habilidad que hayas creado según un criterio determinado.

### Modelo y enrutamiento inteligente

Crea un agente clasificador adaptado a tus tareas que decida qué modelo usar. Esto puede ser útil cuando tu tarea implique muchas llamadas a herramientas y realizar una investigación previa a la ejecución permita identificar el mejor modelo para el trabajo.

Por ejemplo, el mejor modelo para la tarea de "explicar cómo funciona el módulo de autenticación" depende de la cantidad de archivos que contiene dicho módulo y de la estructura del código fuente. Un agente clasificador puede realizar esta investigación y, posteriormente, redirigir la tarea a Sonnet u Opus según su complejidad prevista.

## Cuándo no usar flujos de trabajo dinámicos

Los flujos de trabajo son una novedad. Si bien existen muchos casos de uso en los que generarán resultados extraordinarios, no son necesarios para todas las tareas y podrían terminar consumiendo una cantidad significativamente mayor de tokens.

Lo mejor es usar los flujos de trabajo de forma creativa para llevar Claude Code a límites que no habías considerado antes. Para las tareas de codificación habituales, pregúntate si realmente necesitan más capacidad de procesamiento. Por ejemplo, la mayoría de las tareas de codificación tradicionales no requieren un panel de 5 revisores.

## Consejos para crear flujos de trabajo dinámicos

- Las indicaciones detalladas, utilizando las técnicas específicas descritas, generan los mejores resultados.
- Los flujos de trabajo no son solo para tareas grandes. Puedes indicarle al modelo que utilice un "flujo de trabajo rápido" (ej: revisión adversaria rápida de una suposición).
- Combinar con `/goal` y `/loop` para tareas repetibles (triaje, investigación, verificación).
- Establecer presupuestos explícitos de tokens para limitar uso.
- Guardar flujos en `~/.claude/workflows` o distribuirlos mediante skills.
- Colocar archivos JS de workflow en carpeta de skill y referenciarlos en SKILL.md.

## Un mundo completamente nuevo

Los flujos de trabajo son una nueva y útil forma de ampliar Claude Code. Les recomiendo que lo consideren un punto de partida, ya que aún hay mucho por descubrir sobre cómo usarlos de la mejor manera. Compartan sus hallazgos.

---

> **Thariq Shihipar y Sid Bidasaria** (@sidbid) son miembros del personal técnico de Anthropic y trabajan en Claude Code.
