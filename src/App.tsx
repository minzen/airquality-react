import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeContent from './pages/HomeContent'
import VisualizationsContent from './pages/VisualizationsContent'
import SettingsContent from './pages/SettingsContent'
import {HOME, SETTINGS, VISUALIZATIONS} from './general/constants'

const App = () => {
  const sampleMeas = [
    {'measurementDate': '1582125306', 'temperature': 22.1, 'humidity': 65.0},
    {'measurementDate': '1582211706', 'temperature': 23.2, 'humidity': 68.4},
    {'measurementDate': '1582298106', 'temperature': 20.9, 'humidity': 75.0},
    {'measurementDate': '1582384506', 'temperature': 21.3, 'humidity': 78.2},
    {'measurementDate': '1582470906', 'temperature': 22.0, 'humidity': 66.1},
    {'measurementDate': '1582557306', 'temperature': 22.6, 'humidity': 67.2},
    {'measurementDate': '1582643706', 'temperature': 21.7, 'humidity': 68.3},
  ]
  const [activePage, setActivePage] = useState(HOME)
  const [measurements, setMeasurements] = useState(sampleMeas)

//TODO: Read the measurements from the API and use subscriptions to remain up to date

  useEffect(() => {
  },[])


  const pageContent = () => {
    switch(activePage) {
      case HOME:
        return <HomeContent />
      case VISUALIZATIONS:
        return <VisualizationsContent measurements={measurements} />
      case SETTINGS: 
        return <SettingsContent />
      default: 
        return <HomeContent />
    }    
  }

  return (
    <Container maxWidth="md">
      <Header />
      {pageContent()}
      <Footer setActivePage={setActivePage} />
    </Container>
  )
}
export default App
