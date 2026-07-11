# ANTES - Primitive Obsession
def create_user(name, email, phone, address, city, state, zip_code):
    if len(zip_code) != 5:
        raise ValueError("Invalid zip")
    user = {
        "name": name,
        "email": email,
        "phone": phone,
        "address": address,
        "city": city,
        "state": state,
        "zip_code": zip_code
    }
    return user

# DESPUÉS - Objetos con comportamiento
class Address:
    def __init__(self, street, city, state, zip_code):
        if len(zip_code) != 5:
            raise ValueError("Invalid zip")
        self.street = street
        self.city = city
        self.state = state
        self.zip_code = zip_code

class User:
    def __init__(self, name, email, phone, address):
        self.name = name
        self.email = email
        self.phone = phone
        self.address = address
