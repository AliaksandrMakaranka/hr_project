/**
 * Страница с детальной информацией о вакансии.
 * 
 * Компонент отображает:
 * 1. Заголовок и основную информацию о вакансии
 * 2. Описание и требования
 * 3. Информацию о работодателе
 * 4. Форму отклика на вакансию
 * 
 * @component
 * @param {Object} props - Свойства компонента
 * @param {number} props.vacancyId - ID вакансии
 * @returns {JSX.Element} Страница с детальной информацией о вакансии
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { vacancies } from '../data';
import { useParams, useNavigate } from 'react-router-dom';

// Стилизованные компоненты
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const CompanyInfo = styled.div`
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
`;

const Salary = styled.div`
  font-size: 24px;
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentSection = styled.section`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: #666;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: "•";
    color: #1976d2;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const ContactInfo = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactLabel = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

const ContactValue = styled.div`
  color: #666;
`;

const ApplyButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #aaa;
  
  &:hover {
    color: #777;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const FileInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const SubmitButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
`;

const NavButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NavLinkButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
`;

const VacancyPage: React.FC = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const vacancyIdNumber = vacancyId ? parseInt(vacancyId, 10) : undefined;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    telegram: '',
    resume: null as File | null
  });

  const vacancy = vacancies.find(v => v.id === vacancyIdNumber);

  if (!vacancy) {
    return <div>Вакансия не найдена</div>;
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      telegram: '',
      resume: null as File | null
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToCities = () => {
    navigate('/cities');
  };

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          Назад
        </NavLinkButton>
        <NavLinkButton onClick={handleGoToCities}>
          Поиск по городам
        </NavLinkButton>
      </NavButtonsContainer>

      <Header>
        <Title>{vacancy.title}</Title>
        <CompanyInfo>{vacancy.company}</CompanyInfo>
        <Salary>{vacancy.salary}</Salary>
      </Header>

      <MainContent>
        <div>
          <ContentSection>
            <SectionTitle>Описание вакансии</SectionTitle>
            <Description>{vacancy.description}</Description>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Обязанности</SectionTitle>
            <List>
              {vacancy.responsibilities.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Требования</SectionTitle>
            <List>
              {vacancy.requirements.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Условия работы</SectionTitle>
            <List>
              {vacancy.benefits.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>
        </div>

        <div>
          <ContentSection>
            <SectionTitle>Информация о работодателе</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>Компания</ContactLabel>
                <ContactValue>{vacancy.employer.name}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>{vacancy.employer.email}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Телефон</ContactLabel>
                <ContactValue>{vacancy.employer.phone}</ContactValue>
              </ContactItem>
              {vacancy.employer.website && (
                <ContactItem>
                  <ContactLabel>Веб-сайт</ContactLabel>
                  <ContactValue>
                    <a href={`https://${vacancy.employer.website}`} target="_blank" rel="noopener noreferrer">
                      {vacancy.employer.website}
                    </a>
                  </ContactValue>
                </ContactItem>
              )}
            </ContactInfo>
          </ContentSection>

          <ApplyButton onClick={() => setIsModalOpen(true)}>
            Откликнуться на вакансию
          </ApplyButton>
        </div>
      </MainContent>

      <Modal isOpen={isModalOpen} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <SectionTitle>Отклик на вакансию</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Имя</Label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                name="name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email (необязательно)</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
              />
            </FormGroup>

            <FormGroup>
              <Label>Телефон</Label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                name="phone"
              />
            </FormGroup>

            <FormGroup>
              <Label>Telegram (необязательно)</Label>
              <Input
                type="text"
                value={formData.telegram}
                onChange={handleInputChange}
                name="telegram"
              />
            </FormGroup>

            <FormGroup>
              <Label>Сопроводительное письмо (необязательно)</Label>
              <TextArea
                value={formData.message}
                onChange={handleInputChange}
                name="message"
              />
            </FormGroup>

            <FormGroup>
              <Label>Резюме (необязательно)</Label>
              <FileInput
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                name="resume"
              />
            </FormGroup>

            <SubmitButton type="submit">
              Отправить
            </SubmitButton>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default VacancyPage;