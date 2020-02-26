import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TemperatureBarChart from '../components/TemperatureBarChart'
import HumidityLineChart from '../components/HumidityLineChart'
import Measurement from '../components/MeasurementType'

const useStyles = makeStyles({
  container: {
    height: 400,
    width: 400,
  }
})

interface VisualizationContentProps {
  measurements: Array<Measurement>
}

const VisualizationsContent = (props: VisualizationContentProps) => {
  const classes = useStyles()

  return (
    <Container maxWidth='xl' className={classes.container}>
            <TemperatureBarChart data={props.measurements} />
            <HumidityLineChart data={props.measurements} />
    </Container>

  )
}
export default VisualizationsContent
