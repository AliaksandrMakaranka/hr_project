import styled, { createGlobalStyle } from 'styled-components'
import HomePage from './components/HomePage'
import CitySelectionPage from './components/CitySelectionPage'
import JobsPage from './components/JobsPage'
import VacancyPage from './components/VacancyPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #fafafa;
  }
`

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities" element={<CitySelectionPage />} />
        <Route path="/city/:cityId" element={<JobsPage />} />
        <Route path="/category/:categoryId" element={<JobsPage />} />
        <Route path="/vacancy/:vacancyId" element={<VacancyPage />} />
      </Routes>
    </Router>
  )
}

export default App
