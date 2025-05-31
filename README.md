# HR Company - Поиск работы в Польше

Веб-приложение для поиска работы в Польше, разработанное с использованием React и TypeScript.

## Структура проекта

```
src/
├── components/         # React компоненты
│   ├── HomePage.tsx   # Главная страница
│   ├── CitySelectionPage.tsx # Страница выбора города
│   ├── JobsPage.tsx   # Страница списка вакансий (по городу/категории)
│   ├── VacancyPage.tsx # Страница детальной информации о вакансии
│   └── ...
├── data/              # Данные приложения
│   ├── categories/    # Данные категорий
│   ├── cities/        # Данные городов
│   ├── vacancies/     # Данные вакансий
│   └── index.ts       # Экспорт всех данных
├── types/             # TypeScript типы
└── ...
```

## Установка и запуск

1. Клонируйте репозиторий (после загрузки на GitHub).
2. Установите зависимости:
```bash
npm install
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

4. Для сборки проекта для продакшена:
```bash
npm run build
```

## Основные функции

- **Главная страница:** Отображение категорий профессий с динамическим количеством вакансий и списка популярных городов с динамическим количеством вакансий. Возможность перехода на страницы городов и категорий.
- **Страница выбора города:** Список городов с динамическим количеством вакансий и заглушка для интерактивной карты. Кнопки навигации 'Назад' и 'Все вакансии'.
- **Страница списка вакансий:** Отображение вакансий, отфильтрованных по выбранному городу или категории. Детальная информация о каждой вакансии и кнопка для перехода к полной информации. Кнопки навигации 'Назад' и 'Поиск по городам'.
- **Страница детальной информации о вакансии:** Полная информация о вакансии, включая описание, требования, обязанности, информацию о работодателе. Форма отклика с обязательными и необязательными полями, возможностью прикрепления резюме и кнопкой закрытия модального окна. Кнопки навигации 'Назад' и 'Поиск по городам'.

## Технологии

- React
- TypeScript
- Styled Components
- Vite
- React Router DOM

## Структура данных

### Категории (JobCategory)
```typescript
interface JobCategory {
  id: number;
  name: string;
  vacanciesCount: number; // Динамический подсчет
  description: string;
  icon?: string;
  popularSkills: string[];
  averageSalary: string;
  subcategories?: {
    id: number;
    name: string;
    vacanciesCount: number;
  }[];
}
```

### Города (City)
```typescript
interface City {
  id: number;
  name: string;
  vacanciesCount: number; // Динамический подсчет
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

### Вакансии (Vacancy)
```typescript
interface Vacancy {
  id: number;
  title: string;
  company: string;
  salary: string;
  city: City;
  category: JobCategory;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  employer: {
    name: string;
    email: string;
    phone: string;
    website?: string;
  };
  employmentType: 'full-time' | 'part-time' | 'contract';
  experience: string;
  education: string;
  createdAt: string;
}
```

## Разработка

### Добавление новых данных

Данные хранятся в файлах в директории `src/data/`. Для добавления новых категорий, городов или вакансий редактируйте соответствующие файлы:

- Категории: `src/data/categories/index.ts`
- Города: `src/data/cities/index.ts`
- Вакансии: `src/data/vacancies/index.ts`

### Стилизация

Проект использует Styled Components для стилизации. Стили для каждого компонента определены в соответствующем файле компонента.

### Маршрутизация

Маршрутизация реализована с использованием `react-router-dom`. Основные маршруты определены в `src/App.tsx`:

- `/` - Главная страница (`HomePage`)
- `/cities` - Страница выбора города (`CitySelectionPage`)
- `/city/:cityId` - Страница вакансий для конкретного города (`JobsPage`)
- `/category/:categoryId` - Страница вакансий для конкретной категории (`JobsPage`)
- `/vacancy/:vacancyId` - Страница детальной информации о вакансии (`VacancyPage`)

### Типизация

Все компоненты и данные типизированы с использованием TypeScript. Типы определены в `src/types/index.ts`.

### Навигация

Для навигации между страницами используется хук `useNavigate` из `react-router-dom`.

---

Этот `README.md` предоставляет полное описание проекта, включая структуру, установку, основные функции, технологии, структуру данных и руководство по разработке.
