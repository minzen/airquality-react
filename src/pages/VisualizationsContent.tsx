import React, { useState } from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import TemperatureChart from '../components/TemperatureChart'
import HumidityChart from '../components/HumidityChart'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const MEASUREMENT_DETAILS = gql`
  fragment MeasurementDetails on Measurement {
    measurementDate
    temperature
    humidity
  }
`

const GET_ALL_MEASUREMENTS = gql`
  query {
    measurements {
      ...MeasurementDetails
    }
  }
  ${MEASUREMENT_DETAILS}
`

const MEASUREMENT_ADDED = gql`
  subscription {
    measurementAdded {
      ...MeasurementDetails
    }
  }
  ${MEASUREMENT_DETAILS}
`

const VisualizationsContent = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_ALL_MEASUREMENTS)
  const [measurements, setMeasurements] = useState([])

  useSubscription(MEASUREMENT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Measurement added to the database:', subscriptionData.data)
      const previousMeasurements = measurements
      let updatedMeasurements = previousMeasurements
      let newMeasurement = subscriptionData.data
      updatedMeasurements.push(newMeasurement)
      setMeasurements(updatedMeasurements)
    }
  })
  
  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>error</p>
  }
  if (data && measurements.length === 0) {
    const measurementsCount = data.measurements.length
    setMeasurements(data.measurements.reverse().slice(0, measurementsCount))
  }

  return (
    <Grid item xs>
      <TemperatureChart data={measurements} />
      <HumidityChart data={measurements} />
    </Grid>
  )
}
export default VisualizationsContent
