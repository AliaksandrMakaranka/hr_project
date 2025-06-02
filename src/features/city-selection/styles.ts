import styled from 'styled-components';

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.default};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`; 