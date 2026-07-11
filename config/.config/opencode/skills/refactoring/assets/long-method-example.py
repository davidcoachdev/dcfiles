# ANTES - Método muy largo
def process_order(order):
    if not order.customer:
        return None
    if not order.items:
        return None
    total = 0
    for item in order.items:
        total += item.price * item.quantity
    if total > 100:
        total = total * 0.9
    db.save(order)
    email.send(order.customer, "Order processed")
    return order

# DESPUÉS - Dividir en métodos pequeños
def process_order(order):
    validate_order(order)
    total = calculate_total(order)
    apply_discount(total)
    save_order(order)
    notify_customer(order)
    return order

def validate_order(order):
    return order.customer and order.items

def calculate_total(order):
    return sum(item.price * item.quantity for item in order.items)

def apply_discount(total):
    return total * 0.9 if total > 100 else total

def save_order(order):
    db.save(order)

def notify_customer(order):
    email.send(order.customer, "Order processed")
