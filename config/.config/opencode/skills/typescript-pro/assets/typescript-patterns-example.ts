// Const types pattern
const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

// Flat interfaces
interface UserAddress {
  street: string;
  city: string;
}

interface User {
  id: string;
  name: string;
  address: UserAddress;
}

interface Admin extends User {
  permissions: string[];
}

// Generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Utility types
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;

// Conditional types
type IsString<T> = T extends string ? true : false;
type Flatten<T> = T extends Array<infer U> ? U : T;

// Union types with const
type UserRole = typeof ROLES[keyof typeof ROLES];

const ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
} as const;

// Type guards
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

// Mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;

// Template literal types
type EventName = `on${Capitalize<"click" | "change" | "submit">}`;
// Results in: "onClick" | "onChange" | "onSubmit"
