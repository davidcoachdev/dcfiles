// Domain-Driven Design Example

// Value Object
class Email {
  constructor(private value: string) {
    if (!this.isValid(value)) throw new Error('Invalid email');
  }
  
  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  getValue(): string {
    return this.value;
  }
}

// Aggregate Root
class User {
  constructor(
    private id: string,
    private name: string,
    private email: Email
  ) {}
  
  static create(id: string, name: string, email: string): User {
    return new User(id, name, new Email(email));
  }
  
  getEmail(): Email {
    return this.email;
  }
}

// Repository
interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

// Use Case
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  
  async execute(id: string, name: string, email: string): Promise<void> {
    const user = User.create(id, name, email);
    await this.userRepository.save(user);
  }
}
