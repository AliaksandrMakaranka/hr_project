# State Management

## Overview
Управление состоянием реализовано с использованием Zustand и React Query.

## Store Structure

### Vacancy Store
```typescript
interface VacancyState {
  vacancies: Vacancy[];
  selectedVacancy: Vacancy | null;
  loading: boolean;
  error: string | null;
  filters: VacancyFilters;
}
```

### User Store
```typescript
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### UI Store
```typescript
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}
```

## State Updates
- Действия определены в store
- Асинхронные операции через React Query
- Оптимистичные обновления
- Обработка ошибок

## Persistence
- Локальное хранилище
- Сессионное хранилище
- Кэширование запросов 