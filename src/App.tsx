import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeContent from './pages/HomeContent'
import VisualizationsContent from './pages/VisualizationsContent'
import SettingsContent from './pages/SettingsContent'
import { HOME, SETTINGS, VISUALIZATIONS } from './general/constants'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const NUMBER_OF_MEASUREMENTS = gql` 
  query {
    numberOfMeasurements
  }
`

const App = () => {
  const [activePage, setActivePage] = useState(HOME)
  const { loading, error, data } = useQuery(NUMBER_OF_MEASUREMENTS)
  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>Error</p>
  }
  const measurementCount = data.numberOfMeasurements

  const pageContent = () => {
    switch (activePage) {
      case HOME:
        return <HomeContent numberOfMeasurements={measurementCount} />
      case VISUALIZATIONS:
        return <VisualizationsContent />
      case SETTINGS:
        return <SettingsContent />
      default:
        return <HomeContent numberOfMeasurements={measurementCount} />
    }
  }

  return (
    <Container maxWidth='md'>
      <Header />
      {pageContent()}
      <Footer setActivePage={setActivePage} />
    </Container>
  )
}
export default App
