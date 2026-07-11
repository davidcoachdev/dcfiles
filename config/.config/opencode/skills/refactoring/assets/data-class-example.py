# ANTES - Data Class
class Account:
    def __init__(self):
        self.balance = 0
        self.overdraft_limit = 100
    
    def get_balance(self):
        return self.balance
    
    def set_balance(self, value):
        self.balance = value
    
    def get_overdraft_limit(self):
        return self.overdraft_limit

# Uso - lógica está fuera!
def process_payment(account, amount):
    if account.get_balance() > amount:
        account.set_balance(account.get_balance() - amount)
        return True
    elif account.get_balance() + account.get_overdraft_limit() >= amount:
        account.set_balance(account.get_balance() - amount)
        return True
    return False

# DESPUÉS - tiene comportamiento
class Account:
    def __init__(self):
        self.balance = 0
        self.overdraft_limit = 100
    
    def withdraw(self, amount):
        if self.balance + self.overdraft_limit >= amount:
            self.balance -= amount
            return True
        return False
