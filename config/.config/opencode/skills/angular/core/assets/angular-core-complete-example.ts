import { Component, input, output, signal, computed, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div>Loading users...</div>
    } @else if (error()) {
      <div class="error">{{ error() }}</div>
    } @else {
      @for (user of users(); track user.id) {
        <app-user-card [user]="user" (selected)="onUserSelected($event)" />
      } @empty {
        <div>No users found</div>
      }
    }
  `
})
export class UserListComponent {
  private readonly http = inject(HttpClient);

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedUser = output<User>();

  private readonly loadEffect = effect(() => {
    this.loadUsers();
  });

  async loadUsers() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const users = await this.http.get<User[]>('/api/users').toPromise();
      this.users.set(users || []);
    } catch (err) {
      this.error.set('Failed to load users');
    } finally {
      this.loading.set(false);
    }
  }

  onUserSelected(user: User) {
    this.selectedUser.emit(user);
  }
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      <button (click)="onSelect()">Select</button>
    </div>
  `
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly selected = output<User>();

  onSelect() {
    this.selected.emit(this.user());
  }
}

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <p>Doubled: {{ doubled() }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
    </div>
  `
})
export class CounterComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  private readonly storageEffect = effect(() => {
    localStorage.setItem('count', this.count().toString());
  });

  increment() {
    this.count.update(prev => prev + 1);
  }

  decrement() {
    this.count.update(prev => prev - 1);
  }
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="name()" name="name" placeholder="Name" />
      <input [(ngModel)]="email()" name="email" placeholder="Email" />
      <button type="submit" [disabled]="!isFormValid()">Submit</button>
    </form>
  `
})
export class FormComponent {
  readonly name = signal('');
  readonly email = signal('');
  readonly submitted = output<{ name: string; email: string }>();

  readonly isFormValid = computed(() => {
    return this.name().length > 0 && this.email().length > 0;
  });

  onSubmit() {
    if (this.isFormValid()) {
      this.submitted.emit({
        name: this.name(),
        email: this.email()
      });
      this.name.set('');
      this.email.set('');
    }
  }
}

@Component({
  selector: 'app-status-display',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (status()) {
      @case ('active') {
        <span class="badge-active">Active</span>
      }
      @case ('inactive') {
        <span class="badge-inactive">Inactive</span>
      }
      @case ('pending') {
        <span class="badge-pending">Pending</span>
      }
      @default {
        <span class="badge-unknown">Unknown</span>
      }
    }
  `
})
export class StatusDisplayComponent {
  readonly status = input<'active' | 'inactive' | 'pending' | 'unknown'>('unknown');
}
