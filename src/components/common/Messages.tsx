import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
`;

export const LoadingMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MessageContainer>
    <p>{children}</p>
  </MessageContainer>
);

export const ErrorMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MessageContainer>
    <p style={{ color: 'red' }}>{children}</p>
  </MessageContainer>
);

export const EmptyMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MessageContainer>
    <p>{children}</p>
  </MessageContainer>
); 