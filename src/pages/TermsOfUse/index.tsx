import React from 'react';
import { Container, Title, Section, Text, List, ListItem } from './styles';

const TermsOfUse: React.FC = () => {
  return (
    <Container>
      <Title>Правовая информация / Условия использования</Title>

      <Section>
        <h2>1. Общие положения</h2>
        <Text>
          Настоящие условия использования регулируют отношения между Construction Company ("мы", "нас" или "наш") 
          и пользователями нашего веб-сайта. Используя наш сайт, вы соглашаетесь с этими условиями.
        </Text>
        <List>
          <ListItem>Мы предоставляем услуги по строительству, ремонту и проектированию на территории Польши</ListItem>
          <ListItem>Наш сайт предназначен для информирования о наших услугах и возможностях сотрудничества</ListItem>
          <ListItem>Мы оставляем за собой право изменять эти условия в любое время</ListItem>
        </List>
      </Section>

      <Section>
        <h2>2. Информация об ответственности</h2>
        <Text>
          Мы стремимся предоставлять точную и актуальную информацию, но не можем гарантировать её абсолютную точность:
        </Text>
        <List>
          <ListItem>Информация на сайте может быть изменена без предварительного уведомления</ListItem>
          <ListItem>Мы не несем ответственности за любые убытки, возникшие в результате использования информации с сайта</ListItem>
          <ListItem>Все проекты выполняются в соответствии с польским законодательством и строительными нормами</ListItem>
        </List>
      </Section>

      <Section>
        <h2>3. Правила использования сайта</h2>
        <Text>
          При использовании нашего сайта вы обязуетесь:
        </Text>
        <List>
          <ListItem>Предоставлять достоверную информацию при заполнении форм</ListItem>
          <ListItem>Не использовать сайт для незаконных целей</ListItem>
          <ListItem>Не нарушать работу сайта и не пытаться получить несанкционированный доступ</ListItem>
          <ListItem>Не распространять вредоносное программное обеспечение</ListItem>
        </List>
      </Section>

      <Section>
        <h2>4. Условия сотрудничества</h2>
        <h3>4.1. С физическими лицами:</h3>
        <List>
          <ListItem>Заключение договора на оказание услуг</ListItem>
          <ListItem>Предоставление необходимой документации</ListItem>
          <ListItem>Соблюдение графика платежей</ListItem>
        </List>

        <h3>4.2. С юридическими лицами:</h3>
        <List>
          <ListItem>Заключение договора подряда</ListItem>
          <ListItem>Согласование технических условий</ListItem>
          <ListItem>Соблюдение сроков и условий оплаты</ListItem>
        </List>

        <h3>4.3. С рекрутёрами:</h3>
        <List>
          <ListItem>Заключение договора о сотрудничестве</ListItem>
          <ListItem>Соблюдение конфиденциальности</ListItem>
          <ListItem>Следование установленным процедурам подбора персонала</ListItem>
        </List>
      </Section>

      <Section>
        <h2>5. Обработка персональных данных</h2>
        <Text>
          Мы обрабатываем ваши персональные данные в соответствии с RODO (GDPR) и нашей политикой конфиденциальности:
        </Text>
        <List>
          <ListItem>Сбор только необходимых данных для оказания услуг</ListItem>
          <ListItem>Безопасное хранение и защита данных</ListItem>
          <ListItem>Передача данных только с вашего согласия</ListItem>
          <ListItem>Возможность отозвать согласие на обработку данных</ListItem>
        </List>
      </Section>

      <Section>
        <h2>6. Сторонние ссылки</h2>
        <Text>
          Наш сайт может содержать ссылки на сторонние ресурсы:
        </Text>
        <List>
          <ListItem>Мы не контролируем содержание сторонних сайтов</ListItem>
          <ListItem>Не несем ответственности за информацию на сторонних ресурсах</ListItem>
          <ListItem>Рекомендуем ознакомиться с условиями использования сторонних сайтов</ListItem>
        </List>
      </Section>

      <Section>
        <h2>7. Контактная информация</h2>
        <Text>
          По всем юридическим вопросам обращайтесь:
        </Text>
        <List>
          <ListItem>Email: legal@construction-company.pl</ListItem>
          <ListItem>Телефон: +48 XXX XXX XXX</ListItem>
          <ListItem>Адрес: ul. Example 123, 00-000 Warszawa, Poland</ListItem>
        </List>
      </Section>

      <Section>
        <Text>
          Последнее обновление: {new Date().toLocaleDateString()}
        </Text>
      </Section>
    </Container>
  );
};

export default TermsOfUse; 