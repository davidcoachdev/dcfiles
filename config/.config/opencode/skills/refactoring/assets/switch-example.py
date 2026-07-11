# ANTES - Switch statement grande
class Employee:
    def calculate_pay(self, employee):
        if employee.type == "FULLTIME":
            return employee.salary
        elif employee.type == "PARTTIME":
            return employee.hours * employee.hourly_rate
        elif employee.type == "CONTRACTOR":
            return employee.hours * employee.rate
        else:
            raise ValueError("Unknown type")

# DESPUÉS - Polimorfismo
from abc import ABC, abstractmethod

class Employee(ABC):
    @abstractmethod
    def calculate_pay(self):
        pass

class FullTime(Employee):
    def __init__(self, salary):
        self.salary = salary
    
    def calculate_pay(self):
        return self.salary

class PartTime(Employee):
    def __init__(self, hours, hourly_rate):
        self.hours = hours
        self.hourly_rate = hourly_rate
    
    def calculate_pay(self):
        return self.hours * self.hourly_rate

class Contractor(Employee):
    def __init__(self, hours, rate):
        self.hours = hours
        self.rate = rate
    
    def calculate_pay(self):
        return self.hours * self.rate
