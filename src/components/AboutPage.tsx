import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: min(800px, 90%);
  margin: clamp(2rem, 5vw, 3rem) auto;
  padding: clamp(1.5rem, 4vw, 2rem);
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: #333;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  text-align: center;
  line-height: 1.3;
`;

const Content = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  color: #666;
  line-height: 1.6;
  text-align: justify;
  hyphens: auto;
`;

const AboutPage: React.FC = () => {
  return (
    <Container>
      <Title>О компании HR Company</Title>
      <Content>
        HR Company - ваш надежный партнер в поиске работы в Польше. Мы специализируемся на подборе квалифицированных специалистов для различных отраслей экономики Польши.
        Наша миссия - помочь соискателям найти достойную работу, а работодателям - талантливых сотрудников.
        Мы предлагаем широкий спектр вакансий в строительстве, общественном питании, логистике, производстве и других сферах.
        С нами вы можете быть уверены в официальном трудоустройстве, конкурентной зарплате и поддержке на всех этапах процесса трудоустройства.
        Обращайтесь к нам, и мы поможем вам построить успешную карьеру в Польше!
      </Content>
    </Container>
  );
};

export default AboutPage; 