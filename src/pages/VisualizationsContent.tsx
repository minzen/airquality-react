import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import TemperatureBarChart from '../components/TemperatureBarChart'
import HumidityLineChart from '../components/HumidityLineChart'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_ALL_MEASUREMENTS = gql`
  query {
    measurements {
      measurementDate
      temperature
      humidity
    }
  }
`

const VisualizationsContent = () => {
  const { loading, error, data } = useQuery(GET_ALL_MEASUREMENTS)

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>error</p>
  }
  const measurementsCount = data.measurements.length
  const measurements = data.measurements.reverse().slice(0, measurementsCount)

  return (
    <Grid item xs>
        <TemperatureBarChart data={measurements} />
        <HumidityLineChart data={measurements} />
    </Grid>
  )
}
export default VisualizationsContent
