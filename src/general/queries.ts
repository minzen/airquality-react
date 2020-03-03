import { gql } from 'apollo-boost'

export const HUMIDITY_DETAILS = gql`
  fragment HumidityDetails on Measurement {
    measurementDate
    humidity
  }
`

export const GET_HUMIDITY_MEASUREMENTS = gql`
  query {
    measurements {
      ...HumidityDetails
    }
  }
  ${HUMIDITY_DETAILS}
`

export const HUMIDITY_ADDED = gql`
  subscription {
    measurementAdded {
      ...HumidityDetails
    }
  }
  ${HUMIDITY_DETAILS}
`

export const TEMPERATURE_DETAILS = gql`
  fragment TemperatureDetails on Measurement {
    measurementDate
    temperature
  }
`

export const GET_TEMPERATURE_MEASUREMENTS = gql`
  query {
    measurements {
      ...TemperatureDetails
    }
  }
  ${TEMPERATURE_DETAILS}
`

export const TEMPERATURE_ADDED = gql`
  subscription {
    measurementAdded {
      ...TemperatureDetails
    }
  }
  ${TEMPERATURE_DETAILS}
`
