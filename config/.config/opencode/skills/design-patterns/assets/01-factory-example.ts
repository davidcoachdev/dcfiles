// Factory Pattern Example
interface Product {
  name: string;
  price: number;
}

class ConcreteProductA implements Product {
  name = 'Product A';
  price = 100;
}

class ConcreteProductB implements Product {
  name = 'Product B';
  price = 200;
}

class ProductFactory {
  static createProduct(type: 'A' | 'B'): Product {
    if (type === 'A') return new ConcreteProductA();
    if (type === 'B') return new ConcreteProductB();
    throw new Error('Unknown product type');
  }
}

// Usage
const product = ProductFactory.createProduct('A');
console.log(product.name, product.price);
