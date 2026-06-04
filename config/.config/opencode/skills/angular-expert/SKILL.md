---
name: angular-expert
description: >
  Angular 17+ expert for standalone components, signals, RxJS, and enterprise applications.
  Trigger: When building Angular apps, using signals, RxJS patterns, or Angular components.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Building Angular 17+ applications
- Using standalone components
- Implementing signals for state management
- Working with RxJS patterns
- Enterprise Angular applications

## Core Expertise

### Angular 17+ Modern Features
- Standalone components
- Signals: signal(), computed(), effect()
- toSignal, toObservable from @angular/core/rxjs-interop
- Control flow: @if, @for, @switch

### RxJS Advanced Patterns
- Debounce, throttle, distinctUntilChanged
- switchMap, mergeMap, concatMap
- retry, retryWhen, catchError
- combineLatest, forkJoin, race

### Dependency Injection
- InjectionToken for custom config
- provideRouter, provideHttpClient
- Functional guards: CanActivateFn, CanDeactivateFn
- Functional interceptors

### Forms
- ReactiveFormsModule
- Custom validators (sync + async)
- FormArray for dynamic forms
- FormControl, FormGroup

### Testing
- Component testing with TestBed
- HttpClientTestingModule
- Jasmine spies

## Best Practices

1. Use standalone components by default
2. Leverage signals for reactive state
3. Implement OnPush change detection
4. Use RxJS operators efficiently
5. Follow Angular style guide

## Performance Optimization

1. Use OnPush change detection strategy
2. Implement virtual scrolling for large lists
3. Lazy load modules and components
4. Use track by functions in *ngFor
5. Optimize bundle size with tree shaking