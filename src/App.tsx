import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Header from './components/Header'
import Footer from './components/Footer'
import AboutContent from './pages/AboutContent'
import VisualizationsContent from './pages/VisualizationsContent'
import SettingsContent from './pages/SettingsContent'
import { ABOUT, SETTINGS, VISUALIZATIONS } from './general/constants'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#657a77'
  }
})

const NUMBER_OF_MEASUREMENTS = gql`
  query {
    numberOfMeasurements
  }
`

const App = () => {
  const [activePage, setActivePage] = useState(VISUALIZATIONS)
  const { loading, error, data } = useQuery(NUMBER_OF_MEASUREMENTS)
  const classes = useStyles()

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <p>Error</p>
  }
  const measurementCount = data.numberOfMeasurements

  const pageContent = () => {
    switch (activePage) {
      case ABOUT:
        return <AboutContent numberOfMeasurements={measurementCount} />
      case VISUALIZATIONS:
        return <VisualizationsContent />
      case SETTINGS:
        return <SettingsContent />
      default:
        return <AboutContent numberOfMeasurements={measurementCount} />
    }
  }

  return (
    <div className={classes.root}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item>
          <Header />
        </Grid>
        <Grid container direction='row' justify='center' alignItems='center'>
          {pageContent()}
        </Grid>
      </Grid>
      <Footer setActivePage={setActivePage} />
    </div>
  )
}
export default App
