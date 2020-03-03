import React from 'react'
import { Grid } from '@material-ui/core'
import TemperatureChart from '../components/TemperatureChart'
import HumidityChart from '../components/HumidityChart'

const VisualizationsContent = (): JSX.Element => {
 
  return (
    <Grid item xs>
      <TemperatureChart />
      <HumidityChart />
    </Grid>
  )
}
export default VisualizationsContent
