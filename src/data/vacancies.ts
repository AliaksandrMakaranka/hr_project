import type { Vacancy } from '../types/vacancy';
import { cities } from '../data/cities';
import { jobCategories } from '../data/categories';

export const vacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Строитель-монтажник',
    company: 'BUDEX Sp. z o.o.',
    city: cities[0], // Варшава
    salary: 'от 25 PLN/час',
    description: 'Требуется опытный строитель-монтажник для работы на строительных объектах в Варшаве. Обязанности включают монтаж конструкций, работу с инструментами, выполнение строительных работ.',
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    tags: ['Монтаж', 'Строительство', 'Варшава'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '2',
    title: 'Каменщик',
    company: 'CONSTRUCTION POLAND',
    city: cities[1], // Краков
    salary: 'от 23 PLN/час',
    description: 'Ищем опытных каменщиков для работы на строительных объектах в Кракове. Требуется опыт работы с кирпичом и другими строительными материалами.',
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    tags: ['Каменщик', 'Строительство', 'Краков'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '3',
    title: 'Сварщик',
    company: 'METAL WORK',
    city: cities[2], // Вроцлав
    salary: 'от 28 PLN/час',
    description: 'Требуется квалифицированный сварщик для работы на металлоконструкциях. Необходим опыт работы с различными видами сварки.',
    category: jobCategories.find(c => c.id === 2)!, // Металлообработка
    tags: ['Сварка', 'Металл', 'Вроцлав'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '4',
    title: 'Плотник',
    company: 'WOOD CRAFT',
    city: cities[3], // Познань
    salary: 'от 24 PLN/час',
    description: 'Ищем опытных плотников для работы с деревянными конструкциями. Требуется знание различных пород дерева и техник обработки.',
    category: jobCategories.find(c => c.id === 3)!, // Деревообработка
    tags: ['Плотник', 'Дерево', 'Познань'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '5',
    title: 'Электрик',
    company: 'ELECTRO SERVICE',
    city: cities[4], // Гданьск
    salary: 'от 26 PLN/час',
    description: 'Требуется квалифицированный электрик для монтажа и обслуживания электрических систем. Необходим опыт работы с различным электрооборудованием.',
    category: jobCategories.find(c => c.id === 4)!, // Электрика
    tags: ['Электрика', 'Монтаж', 'Гданьск'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '6',
    title: 'Сантехник',
    company: 'PLUMBING PRO',
    city: cities[5], // Лодзь
    salary: 'от 25 PLN/час',
    description: 'Ищем опытных сантехников для установки и обслуживания сантехнического оборудования. Требуется знание современных систем водоснабжения и отопления.',
    category: jobCategories.find(c => c.id === 5)!, // Сантехника
    tags: ['Сантехника', 'Монтаж', 'Лодзь'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '7',
    title: 'Маляр',
    company: 'PAINT MASTERS',
    city: cities[0], // Варшава
    salary: 'от 22 PLN/час',
    description: 'Требуется опытный маляр для внутренних и наружных работ. Необходим опыт работы с различными видами красок и отделочных материалов.',
    category: jobCategories.find(c => c.id === 6)!, // Отделочные работы
    tags: ['Маляр', 'Отделка', 'Варшава'],
    experience: 'от 1 года',
    employmentType: 'full-time'
  },
  {
    id: '8',
    title: 'Штукатур',
    company: 'PLASTER PRO',
    city: cities[1], // Краков
    salary: 'от 23 PLN/час',
    description: 'Ищем квалифицированных штукатуров для выполнения внутренних и наружных работ. Требуется опыт работы с различными видами штукатурных смесей.',
    category: jobCategories.find(c => c.id === 6)!, // Отделочные работы
    tags: ['Штукатур', 'Отделка', 'Краков'],
    experience: 'от 1 года',
    employmentType: 'full-time'
  },
  {
    id: '9',
    title: 'Кровельщик',
    company: 'ROOF MASTERS',
    city: cities[2], // Вроцлав
    salary: 'от 27 PLN/час',
    description: 'Требуется опытный кровельщик для работы с различными видами кровельных материалов. Необходим опыт монтажа крыш и кровельных систем.',
    category: jobCategories.find(c => c.id === 7)!, // Кровельные работы
    tags: ['Кровля', 'Монтаж', 'Вроцлав'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '10',
    title: 'Бетонщик',
    company: 'CONCRETE PRO',
    city: cities[3], // Познань
    salary: 'от 24 PLN/час',
    description: 'Ищем квалифицированных бетонщиков для работы с бетонными конструкциями. Требуется опыт работы с различными марками бетона.',
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    tags: ['Бетон', 'Строительство', 'Познань'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '11',
    title: 'Арматурщик',
    company: 'STEEL CONSTRUCTION',
    city: cities[4], // Гданьск
    salary: 'от 25 PLN/час',
    description: 'Требуется опытный арматурщик для работы с металлической арматурой. Необходим опыт вязки арматуры и работы с чертежами.',
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    tags: ['Арматура', 'Строительство', 'Гданьск'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '12',
    title: 'Монтажник фасадов',
    company: 'FACADE PRO',
    city: cities[5], // Лодзь
    salary: 'от 26 PLN/час',
    description: 'Ищем квалифицированных монтажников фасадов. Требуется опыт работы с различными видами фасадных систем.',
    category: jobCategories.find(c => c.id === 6)!, // Отделочные работы
    tags: ['Фасад', 'Монтаж', 'Лодзь'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '13',
    title: 'Строительный рабочий',
    company: 'BUILD TEAM',
    city: cities[0], // Варшава
    salary: 'от 21 PLN/час',
    description: 'Требуются строительные рабочие для выполнения различных строительных работ. Опыт работы приветствуется.',
    category: jobCategories.find(c => c.id === 1)!, // Строительство
    tags: ['Строительство', 'Разнорабочий', 'Варшава'],
    experience: 'от 1 года',
    employmentType: 'full-time'
  },
  {
    id: '14',
    title: 'Монтажник окон',
    company: 'WINDOW PRO',
    city: cities[1], // Краков
    salary: 'от 25 PLN/час',
    description: 'Ищем опытных монтажников окон. Требуется опыт установки пластиковых и деревянных окон.',
    category: jobCategories.find(c => c.id === 5)!, // Монтажные работы
    tags: ['Окна', 'Монтаж', 'Краков'],
    experience: 'от 1 года',
    employmentType: 'full-time'
  },
  {
    id: '15',
    title: 'Строительный инженер',
    company: 'ENGINEERING PRO',
    city: cities[2], // Вроцлав
    salary: 'от 35 PLN/час',
    description: 'Требуется строительный инженер для контроля и управления строительными проектами. Необходим опыт работы и знание строительных норм.',
    category: jobCategories.find(c => c.id === 8)!, // Инженерия
    tags: ['Инженерия', 'Управление', 'Вроцлав'],
    experience: 'от 3 лет',
    employmentType: 'full-time'
  },
  {
    id: '16',
    title: 'Монтажник вентиляции',
    company: 'VENT PRO',
    city: cities[3], // Познань
    salary: 'от 26 PLN/час',
    description: 'Ищем квалифицированных монтажников вентиляционных систем. Требуется опыт работы с системами вентиляции и кондиционирования.',
    category: jobCategories.find(c => c.id === 5)!, // Монтажные работы
    tags: ['Вентиляция', 'Монтаж', 'Познань'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '17',
    title: 'Строительный техник',
    company: 'TECH PRO',
    city: cities[4], // Гданьск
    salary: 'от 28 PLN/час',
    description: 'Требуется строительный техник для обслуживания строительной техники. Необходим опыт работы с различными видами строительного оборудования.',
    category: jobCategories.find(c => c.id === 9)!, // Техника
    tags: ['Техника', 'Обслуживание', 'Гданьск'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '18',
    title: 'Монтажник систем безопасности',
    company: 'SECURITY PRO',
    city: cities[5], // Лодзь
    salary: 'от 27 PLN/час',
    description: 'Ищем опытных монтажников систем безопасности. Требуется опыт установки систем видеонаблюдения и контроля доступа.',
    category: jobCategories.find(c => c.id === 10)!, // Безопасность
    tags: ['Безопасность', 'Монтаж', 'Лодзь'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  },
  {
    id: '19',
    title: 'Строительный прораб',
    company: 'CONSTRUCTION LEAD',
    city: cities[0], // Варшава
    salary: 'от 32 PLN/час',
    description: 'Требуется опытный прораб для управления строительной бригадой. Необходим опыт руководства строительными работами.',
    category: jobCategories.find(c => c.id === 11)!, // Управление
    tags: ['Управление', 'Строительство', 'Варшава'],
    experience: 'от 3 лет',
    employmentType: 'full-time'
  },
  {
    id: '20',
    title: 'Монтажник лифтов',
    company: 'ELEVATOR PRO',
    city: cities[1], // Краков
    salary: 'от 30 PLN/час',
    description: 'Ищем квалифицированных монтажников лифтового оборудования. Требуется опыт установки и обслуживания лифтов.',
    category: jobCategories.find(c => c.id === 5)!, // Монтажные работы
    tags: ['Лифты', 'Монтаж', 'Краков'],
    experience: 'от 2 лет',
    employmentType: 'full-time'
  }
]; 