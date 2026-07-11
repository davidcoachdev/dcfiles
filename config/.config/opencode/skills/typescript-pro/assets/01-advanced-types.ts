// Conditional Types
type IsString<T> = T extends string ? true : false;
type A = IsString<'hello'>; // true
type B = IsString<42>; // false

// Mapped Types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Template Literal Types
type EventName = 'click' | 'hover' | 'focus';
type EventHandler = `on${Capitalize<EventName>}`;
// 'onClick' | 'onHover' | 'onFocus'
