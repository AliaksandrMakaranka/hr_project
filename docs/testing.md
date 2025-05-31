# Тестирование HR Company

## Обзор
В проекте используется комплексный подход к тестированию, включающий модульные тесты, интеграционные тесты и тесты компонентов. Мы используем React Testing Library с Vitest для написания надежных и поддерживаемых тестов.

## Основные принципы

### 1. Тестирование компонентов
- Тестируем только критически важную логику
- Используем семантические запросы для поиска элементов
- Все компоненты обернуты в ThemeProvider
- Избегаем хрупких тестов на стили и DOM-структуру

### 2. Тестирование хуков
- Тестируем логику работы хуков
- Проверяем обработку ошибок и состояний загрузки
- Тестируем обновление состояния

### 3. Тестирование утилит
- Тестируем чистые функции
- Проверяем граничные случаи
- Тестируем обработку ошибок

## Примеры тестов

### Тестирование компонента страницы городов
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { describe, it, expect, vi } from 'vitest';
import CitiesPage from '../pages/Cities';
import { useVacancyCounts } from '../hooks/useVacancyCounts';

// Мок хука useVacancyCounts
vi.mock('../hooks/useVacancyCounts');

describe('CitiesPage', () => {
  it('renders loading state', () => {
    vi.mocked(useVacancyCounts).mockReturnValue({
      citiesWithCounts: [],
      isLoading: true,
      error: null
    });

    render(
      <ThemeProvider theme={theme}>
        <CitiesPage />
      </ThemeProvider>
    );

    expect(screen.getByText('Загрузка городов...')).toBeInTheDocument();
  });

  it('renders cities with vacancies', async () => {
    const mockCities = [
      { id: 1, name: 'Варшава', vacanciesCount: 5 },
      { id: 2, name: 'Краков', vacanciesCount: 3 }
    ];

    vi.mocked(useVacancyCounts).mockReturnValue({
      citiesWithCounts: mockCities,
      isLoading: false,
      error: null
    });

    render(
      <ThemeProvider theme={theme}>
        <CitiesPage />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Варшава')).toBeInTheDocument();
      expect(screen.getByText('Краков')).toBeInTheDocument();
    });
  });

  it('renders error state', () => {
    vi.mocked(useVacancyCounts).mockReturnValue({
      citiesWithCounts: [],
      isLoading: false,
      error: new Error('Failed to load cities')
    });

    render(
      <ThemeProvider theme={theme}>
        <CitiesPage />
      </ThemeProvider>
    );

    expect(screen.getByText('Ошибка при загрузке городов')).toBeInTheDocument();
  });
});
```

### Тестирование хука useVacancyCounts
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useVacancyCounts } from '../hooks/useVacancyCounts';
import { getCities } from '../api/cities';

vi.mock('../api/cities');

describe('useVacancyCounts', () => {
  it('returns cities with vacancy counts', async () => {
    const mockCities = [
      { id: 1, name: 'Варшава', vacanciesCount: 5 },
      { id: 2, name: 'Краков', vacanciesCount: 3 }
    ];

    vi.mocked(getCities).mockResolvedValue(mockCities);

    const { result } = renderHook(() => useVacancyCounts());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.citiesWithCounts).toEqual(mockCities);
    });
  });

  it('handles error state', async () => {
    const error = new Error('Failed to load cities');
    vi.mocked(getCities).mockRejectedValue(error);

    const { result } = renderHook(() => useVacancyCounts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(error);
    });
  });
});
```

### Тестирование утилит
```typescript
import { describe, it, expect } from 'vitest';
import { updateCitiesWithVacancyCounts } from '../utils/filters';

describe('updateCitiesWithVacancyCounts', () => {
  it('updates cities with vacancy counts', () => {
    const cities = [
      { id: 1, name: 'Варшава' },
      { id: 2, name: 'Краков' }
    ];

    const vacancies = [
      { id: 1, city: { id: 1 }, title: 'Job 1' },
      { id: 2, city: { id: 1 }, title: 'Job 2' },
      { id: 3, city: { id: 2 }, title: 'Job 3' }
    ];

    const result = updateCitiesWithVacancyCounts(cities, vacancies);

    expect(result[0].vacanciesCount).toBe(2);
    expect(result[1].vacanciesCount).toBe(1);
  });

  it('handles empty cities array', () => {
    const result = updateCitiesWithVacancyCounts([], []);
    expect(result).toEqual([]);
  });

  it('handles empty vacancies array', () => {
    const cities = [
      { id: 1, name: 'Варшава' },
      { id: 2, name: 'Краков' }
    ];

    const result = updateCitiesWithVacancyCounts(cities, []);

    expect(result[0].vacanciesCount).toBe(0);
    expect(result[1].vacanciesCount).toBe(0);
  });
});
```

## Запуск тестов

### Локальный запуск
```bash
npm test
```

### Запуск с отчетом о покрытии
```bash
npm test -- --coverage
```

### Запуск в режиме наблюдения
```bash
npm test -- --watch
```

## Рекомендации по написанию тестов

1. **Именование тестов**
   - Используйте описательные имена
   - Группируйте связанные тесты
   - Используйте паттерн "should" или "when"

2. **Структура теста**
   - Arrange: подготовка данных
   - Act: выполнение действия
   - Assert: проверка результата

3. **Изоляция тестов**
   - Каждый тест должен быть независимым
   - Используйте beforeEach для общей настройки
   - Очищайте моки после каждого теста

4. **Проверка ошибок**
   - Тестируйте обработку ошибок
   - Проверяйте граничные случаи
   - Тестируйте асинхронные операции

5. **Моки и стабы**
   - Используйте моки для внешних зависимостей
   - Создавайте реалистичные тестовые данные
   - Избегайте излишнего мокирования 