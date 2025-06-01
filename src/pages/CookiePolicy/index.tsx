import React from 'react';
import { Container, Title, Section, Text, List, ListItem } from './styles';

const CookiePolicy: React.FC = () => {
  return (
    <Container>
      <Title>Политика использования файлов cookie</Title>

      <Section>
        <h2>1. Что такое cookie?</h2>
        <Text>
          Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. 
          Они позволяют сайту запоминать ваши действия и предпочтения (например, выбранный язык, фильтры поиска, 
          состояние авторизации) на определённое время.
        </Text>
      </Section>

      <Section>
        <h2>2. Для чего мы используем cookie?</h2>
        <Text>
          Мы используем cookie-файлы для следующих целей:
        </Text>
        <List>
          <ListItem>Обеспечение корректной работы сайта и его функций</ListItem>
          <ListItem>Сохранение выбранного языка и фильтров поиска</ListItem>
          <ListItem>Запоминание состояния авторизации</ListItem>
          <ListItem>Аналитика и улучшение качества наших услуг</ListItem>
          <ListItem>Персонализация пользовательского опыта</ListItem>
        </List>
      </Section>

      <Section>
        <h2>3. Какие типы cookie мы используем?</h2>
        <h3>3.1. Технические (обязательные) cookie</h3>
        <Text>
          Необходимы для работы сайта и предоставления основных функций:
        </Text>
        <List>
          <ListItem>Сохранение сессии пользователя</ListItem>
          <ListItem>Обеспечение безопасности</ListItem>
          <ListItem>Базовая функциональность сайта</ListItem>
        </List>

        <h3>3.2. Функциональные cookie</h3>
        <Text>
          Позволяют запоминать ваши предпочтения:
        </Text>
        <List>
          <ListItem>Выбранный язык интерфейса</ListItem>
          <ListItem>Настройки фильтров поиска вакансий</ListItem>
          <ListItem>Предпочтения отображения контента</ListItem>
        </List>

        <h3>3.3. Аналитические cookie</h3>
        <Text>
          Помогают собирать статистику о посещениях и использовании сайта:
        </Text>
        <List>
          <ListItem>Google Analytics</ListItem>
          <ListItem>Yandex Metrica</ListItem>
          <ListItem>Внутренняя аналитика</ListItem>
        </List>
      </Section>

      <Section>
        <h2>4. Как вы можете управлять cookie?</h2>
        <Text>
          Вы можете самостоятельно управлять cookie-файлами через настройки вашего браузера:
        </Text>
        <List>
          <ListItem>Запретить сохранение всех или некоторых cookie</ListItem>
          <ListItem>Удалить уже сохранённые файлы</ListItem>
          <ListItem>Настроить автоматическое удаление cookie при закрытии браузера</ListItem>
        </List>
        <Text>
          Обратите внимание, что при отключении cookie некоторые функции сайта могут быть недоступны 
          или работать некорректно.
        </Text>
      </Section>

      <Section>
        <h2>5. Передача и защита данных</h2>
        <Text>
          Мы обеспечиваем безопасность ваших данных следующим образом:
        </Text>
        <List>
          <ListItem>Cookie-файлы не передаются третьим лицам, за исключением наших партнёрских компаний</ListItem>
          <ListItem>Все данные обрабатываются в соответствии с требованиями GDPR (RODO)</ListItem>
          <ListItem>Используется шифрование при передаче данных</ListItem>
          <ListItem>Регулярно проводится аудит безопасности</ListItem>
        </List>
      </Section>

      <Section>
        <h2>6. Правовая основа</h2>
        <Text>
          Использование cookie-файлов основано на вашем согласии, которое вы даёте при первом посещении сайта. 
          Вы можете изменить своё решение в любой момент через настройки браузера.
        </Text>
        <Text>
          Более подробная информация о том, как мы обрабатываем ваши данные, доступна в нашей 
          <a href="/privacy-policy">Политике конфиденциальности</a>.
        </Text>
      </Section>

      <Section>
        <Text>
          Последнее обновление: {new Date().toLocaleDateString()}
        </Text>
      </Section>
    </Container>
  );
};

export default CookiePolicy; 