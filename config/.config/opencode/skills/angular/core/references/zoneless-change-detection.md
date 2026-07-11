# Zoneless Angular & Change Detection

## Zoneless Angular

Modern Angular runs without Zone.js for better performance.

### Setup

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()]
});
```

### Remove Zone.js

```bash
npm uninstall zone.js
```

Remove from `angular.json`:
```json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "polyfills": [
              // Remove "zone.js" and "zone.js/testing"
            ]
          }
        }
      }
    }
  }
}
```

## Change Detection Strategy

Always use `OnPush`:

```typescript
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class CardComponent {}
```

### Why OnPush?

- **Performance** - Only checks when inputs change
- **Predictable** - Clear when component updates
- **Zoneless-friendly** - Works with signal-based change detection

## Signals Auto-Notify

Signals automatically notify Angular of changes:

```typescript
readonly count = signal(0);

// Angular knows to check when count changes
this.count.set(5);
```

## AsyncPipe for Observables

Use `AsyncPipe` to subscribe to observables:

```html
{{ data$ | async }}
```

Or convert to signal:

```typescript
readonly data = toSignal(this.data$, { initialValue: null });
```

## markForCheck() When Needed

For edge cases where change detection doesn't trigger:

```typescript
import { ChangeDetectorRef } from '@angular/core';

constructor(private cdr: ChangeDetectorRef) {}

someMethod() {
  this.cdr.markForCheck();
}
```

## Performance Benefits

- **Smaller bundle** - No Zone.js (~60KB)
- **Faster startup** - No Zone.js initialization
- **Better performance** - Fewer change detection cycles
- **Cleaner code** - Signals handle reactivity

## Migration Checklist

- [ ] Use `provideZonelessChangeDetection()`
- [ ] Remove Zone.js from dependencies
- [ ] Use `ChangeDetectionStrategy.OnPush` on all components
- [ ] Use signals for state
- [ ] Use `AsyncPipe` or `toSignal()` for observables
- [ ] Test thoroughly

## References

- [Zoneless Angular](https://angular.dev/guide/zoneless)
- [Change Detection](https://angular.dev/guide/change-detection)
- [Signals](https://angular.dev/guide/signals)
