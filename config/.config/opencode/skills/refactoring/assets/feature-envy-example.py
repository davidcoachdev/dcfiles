# ANTES - Feature Envy
class ShoppingCart:
    def get_total(self):
        total = 0
        for item in self.items:
            price = item.product.price
            qty = item.quantity
            discount = item.product.discount
            total += (price * qty) * (1 - discount)
        return total

# DESPUÉS - Mover lógica donde pertenecen los datos
class Item:
    def get_subtotal(self):
        return (self.product.price * self.quantity) * (1 - self.product.discount)

class ShoppingCart:
    def get_total(self):
        return sum(item.get_subtotal() for item in self.items)
