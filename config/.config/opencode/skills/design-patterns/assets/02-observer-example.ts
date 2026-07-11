// Observer Pattern Example
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

class ConcreteObserver implements Observer {
  update(data: any): void {
    console.log('Observer received:', data);
  }
}

// Usage
const subject = new Subject();
const observer = new ConcreteObserver();
subject.attach(observer);
subject.notify({ message: 'Hello' });
