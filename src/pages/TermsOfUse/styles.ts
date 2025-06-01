import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #1976d2;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #1976d2;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  h3 {
    color: #333;
    margin: 1.5rem 0 1rem;
    font-size: 1.2rem;
  }
`;

export const Text = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #666;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #666;
  line-height: 1.6;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #1976d2;
  }
`; 