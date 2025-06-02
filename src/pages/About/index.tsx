import React from 'react';
import { motion } from 'framer-motion';

// Reusing styles from Home page for consistency
import { Container, SectionTitle, AboutText, AboutContent } from '../Home/styles';

const AboutPage: React.FC = () => {
  return (
    <Container>
      <AboutContent>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>О компании HR Company</SectionTitle>
          <AboutText>
            Мы специализируемся на подборе квалифицированных специалистов для строительной отрасли в Польше.
          </AboutText>

          <h3>Наша миссия и цели</h3>
          <AboutText>
            Наша главная цель — помочь квалифицированным рабочим найти достойную и легальную работу в Польше.
            Мы стремимся обеспечить прозрачный и эффективный процесс трудоустройства для обеих сторон.
          </AboutText>

          <h3>Что мы предлагаем соискателям</h3>
          <AboutText>
            <ul>
              <li>Обширную базу вакансий в различных городах и категориях строительной отрасли Польши.</li>
              <li>Подробную информацию о каждой вакансии, включая требования, обязанности и условия работы.</li>
              <li>Помощь и сопровождение на всех этапах трудоустройства.</li>
            </ul>
          </AboutText>

          <h3>Что мы предлагаем работодателям</h3>
          <AboutText>
            <ul>
              <li>Эффективный подбор квалифицированного персонала, соответствующего вашим требованиям.</li>
              <li>Организацию и проведение собеседований.</li>
              <li>Полное юридическое сопровождение процесса оформления сотрудников.</li>
            </ul>
          </AboutText>

          <h3>Наши преимущества</h3>
          <AboutText>
            <ul>
              <li>Гарантия конфиденциальности ваших данных в соответствии с GDPR/RODO.</li>
              <li>Поддержка на русском и польском языках.</li>
              <li>Работа только с проверенными и надежными работодателями.</li>
              <li>Индивидуальный подход к каждому клиенту.</li>
            </ul>
          </AboutText>

          <h3>Контактная информация</h3>
          <AboutText>
            Email: privacy@hrcompany.pl<br/>
            Телефон: +48 XXX XXX XXX<br/>
            Адрес: ul. Example 123, 00-000 Warszawa, Poland
          </AboutText>

        </motion.div>
      </AboutContent>
    </Container>
  );
};

export default AboutPage; 