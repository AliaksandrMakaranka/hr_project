/**
 * Главная страница приложения для поиска работы в Польше.
 * 
 * Компонент отображает:
 * 1. Заголовок и подзаголовок
 * 2. Сетку карточек категорий профессий
 * 
 * Каждая карточка категории содержит:
 * - Иконку и название категории
 * - Описание
 * - Статистику (количество вакансий и средняя зарплата)
 * - Список популярных навыков
 * - Кнопку для перехода к вакансиям
 * 
 * @component
 * @returns {JSX.Element} Главная страница приложения
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import {
  Container,
  Hero,
  Title,
  Subtitle,
  AboutSection,
  AboutContent,
  AboutText,
  AdvantagesSection,
  AdvantagesGrid,
  AdvantageCard,
  CTASection,
  CTAButton,
  CTAButtonSecondary,
  SectionTitle,
  SectionSubtitle,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel
} from './styles';

const advantages = [
  {
    title: '10 лет на рынке',
    description: 'Более 10 лет успешной работы в сфере подбора персонала для строительной отрасли',
    icon: '🏗️'
  },
  {
    title: '5000+ кандидатов',
    description: 'Более 5000 успешно трудоустроенных специалистов в польских компаниях',
    icon: '👷'
  },
  {
    title: 'Юридическая поддержка',
    description: 'Полное юридическое сопровождение процесса трудоустройства',
    icon: '⚖️'
  },
  {
    title: 'Прямые работодатели',
    description: 'Работаем напрямую с крупнейшими строительными компаниями Польши',
    icon: '🤝'
  }
];

const stats = [
  { number: '10+', label: 'Лет опыта' },
  { number: '5000+', label: 'Трудоустроенных' },
  { number: '100+', label: 'Компаний-партнеров' },
  { number: '98%', label: 'Успешных трудоустройств' }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Hero>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Найдите работу в строительстве в Польше</Title>
          <Subtitle>
            Мы помогаем строительным специалистам найти лучшие вакансии в польских компаниях.
            Гарантируем легальное трудоустройство и полное сопровождение.
          </Subtitle>
          <CTAButton onClick={() => navigate(ROUTES.VACANCIES)}>
            Посмотреть вакансии
          </CTAButton>
        </motion.div>
      </Hero>

      <AboutSection>
        <AboutContent>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>О компании</SectionTitle>
            <AboutText>
              Мы специализируемся на подборе квалифицированных специалистов для строительной отрасли в Польше.
              Наша миссия — помогать строительным специалистам находить достойную работу, а компаниям —
              надежных сотрудников.
            </AboutText>
            <AboutText>
              Мы работаем как с соискателями, так и с работодателями, обеспечивая эффективное взаимодействие
              между ними и гарантируя качественный результат.
            </AboutText>
          </motion.div>
        </AboutContent>
      </AboutSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <StatCard>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          </motion.div>
        ))}
      </StatsGrid>

      <AdvantagesSection>
        <SectionTitle>Наши преимущества</SectionTitle>
        <SectionSubtitle>
          Почему тысячи специалистов выбирают нас для поиска работы в Польше
        </SectionSubtitle>
        <AdvantagesGrid>
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AdvantageCard>
                <div className="icon">{advantage.icon}</div>
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </AdvantageCard>
            </motion.div>
          ))}
        </AdvantagesGrid>
      </AdvantagesSection>

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Готовы начать?</SectionTitle>
          <SectionSubtitle>
            Найдите подходящую вакансию или оставьте заявку, и мы поможем вам с трудоустройством
          </SectionSubtitle>
          <div>
            <CTAButton onClick={() => navigate(ROUTES.VACANCIES)}>
              Посмотреть вакансии
            </CTAButton>
            <CTAButtonSecondary onClick={() => navigate(ROUTES.CONTACT)}>
              Оставить заявку
            </CTAButtonSecondary>
          </div>
        </motion.div>
      </CTASection>
    </Container>
  );
};

export default HomePage; 