# Angular Standalone Components & Control Flow

## Standalone Components

All components are standalone by default in modern Angular.

### Basic Pattern

```typescript
@Component({
  selector: 'app-user',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>{{ user().name }}</div>
  `
})
export class UserComponent {
  readonly user = input.required<User>();
}
```

### Imports

Declare dependencies in the `imports` array:

```typescript
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    UserComponent,
    HeaderComponent,
  ],
  template: `...`
})
export class DashboardComponent {}
```

### Change Detection

Always use `OnPush`:

```typescript
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class CardComponent {}
```

## Native Control Flow

Replace `*ngIf`, `*ngFor`, `*ngSwitch` with native syntax:

### @if / @else

```html
@if (loading()) {
  <spinner />
} @else if (error()) {
  <error-message [error]="error()" />
} @else {
  <content [data]="data()" />
}
```

### @for

```html
@for (item of items(); track item.id) {
  <item-card [data]="item" />
} @empty {
  <p>No items found</p>
}
```

### @switch

```html
@switch (status()) {
  @case ('active') {
    <span class="badge-active">Active</span>
  }
  @case ('inactive') {
    <span class="badge-inactive">Inactive</span>
  }
  @default {
    <span class="badge-unknown">Unknown</span>
  }
}
```

## Benefits

- **Faster** - No directive overhead
- **Cleaner** - More readable syntax
- **Type-safe** - Better IDE support
- **Smaller bundle** - No directive code

## Migration from *ngIf/*ngFor

```html
<!-- OLD -->
<div *ngIf="loading">Loading...</div>
<div *ngFor="let item of items">{{ item.name }}</div>

<!-- NEW -->
@if (loading()) {
  <div>Loading...</div>
}
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

## References

- [Control Flow](https://angular.dev/guide/templates/control-flow)
- [Standalone Components](https://angular.dev/guide/standalone-components)
- [Change Detection](https://angular.dev/guide/change-detection)
