import React from 'react'
import { Grid, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles({
  container: {
    height: 400,
    width: 920
  },
  headerContainer: {
    height: 100,
    width: 620,
    backgroundColor: '#ddaabb',
    margin: 20
  },
  subContainer: {
    height: 400,
    width: 400
  }
})

const VisualizationsContent = () => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_ALL_MEASUREMENTS)

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>error</p>
  }
  const measurementsCount = data.measurements.length
  const measurements = data.measurements.slice(measurementsCount - 11, measurementsCount - 1)

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={12} className={classes.headerContainer}>
          <Typography variant='h5'>
            Please have a look at the current air quality @home with the
            provided charts.
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.subContainer}>
          <TemperatureBarChart data={measurements} />
        </Grid>
        <Grid item xs={6} className={classes.subContainer}>
          <HumidityLineChart data={measurements} />
        </Grid>
      </Grid>
    </>
  )
}
export default VisualizationsContent
