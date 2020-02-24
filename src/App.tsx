import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeContent from './pages/HomeContent'
import VisualizationsContent from './pages/VisualizationsContent'
import SettingsContent from './pages/SettingsContent'
import {HOME, SETTINGS, VISUALIZATIONS} from './general/constants'

const App = () => {
  const [activePage, setActivePage] = useState(HOME)

  const pageContent = () => {
    switch(activePage) {
      case HOME:
        return <HomeContent />
      case VISUALIZATIONS:
        return <VisualizationsContent />
      case SETTINGS: 
        return <SettingsContent />
      default: 
        return <HomeContent />
    }    
  }

  return (
    <Container>
      <Header />
      {pageContent()}
      <Footer setActivePage={setActivePage} />
    </Container>
  )
}
export default App
