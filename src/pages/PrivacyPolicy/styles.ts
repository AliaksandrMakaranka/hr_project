import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.4rem;
    color: #34495e;
    margin: 1.5rem 0 1rem;
  }
`;

export const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #444;
`;

export const List = styled.ul`
  list-style-type: none;
  padding-left: 1.5rem;
  margin: 1rem 0;
`;

export const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  color: #444;
  position: relative;
  
  &:before {
    content: "•";
    color: #3498db;
    font-weight: bold;
    position: absolute;
    left: -1.5rem;
  }
`; 