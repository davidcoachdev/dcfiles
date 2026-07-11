# ANTES - código duplicado
def process_user():
    print("Processing user...")
    save_to_db()
    log("Done")

def process_order():
    print("Processing order...")
    save_to_db()
    log("Done")

# DESPUÉS - extraer método común
def save_and_log():
    save_to_db()
    log("Done")

def process_user():
    print("Processing user...")
    save_and_log()

def process_order():
    print("Processing order...")
    save_and_log()
