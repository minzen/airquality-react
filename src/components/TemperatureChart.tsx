import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { timestampToDate } from '../utils/utils'
import { Button, Menu, MenuItem, CircularProgress } from '@material-ui/core'
import { CirclePicker } from 'react-color'
import { LINE, BAR } from '../general/constants'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const TEMPERATURE_DETAILS = gql`
  fragment TemperatureDetails on Measurement {
    measurementDate
    temperature
  }
`

const GET_TEMPERATURE_MEASUREMENTS = gql`
  query {
    measurements {
      ...TemperatureDetails
    }
  }
  ${TEMPERATURE_DETAILS}
`

const TEMPERATURE_ADDED = gql`
  subscription {
    measurementAdded {
      ...TemperatureDetails
    }
  }
  ${TEMPERATURE_DETAILS}
`

const useStyles = makeStyles({
  container: {
    marginBottom: 30,
    backgroundColor: '#ffffff'
  },
  button: {
    margin: 5
  }
})

const TemperatureChart = () => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState(BAR)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8884d8')
  const [temperatureMeasurements, setTemperatureMeasurements] = useState([])
  const [chartKey, setChartKey] = useState('')
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_TEMPERATURE_MEASUREMENTS)
  useSubscription(TEMPERATURE_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Measurement added to the database:', subscriptionData.data)
      const ts = subscriptionData.data.measurementAdded.measurementDate
      const newMeasurement = subscriptionData.data.measurementAdded
      newMeasurement.measurementDate = timestampToDate(parseInt(ts))
      console.log('temperature', newMeasurement.temperature)
      console.log('before',temperatureMeasurements)
      temperatureMeasurements.push(newMeasurement)
      console.log('after',temperatureMeasurements)
      setTemperatureMeasurements(temperatureMeasurements)
      setChartKey(newMeasurement.measurementDate)
    }
  })

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>error</p>
  }
  if (data && temperatureMeasurements.length === 0) {
    const measurementsCount = data.measurements.length
    const measurements = data.measurements.reverse().slice(0, measurementsCount)
    const temperatureMeasurementsWithTimestampsAsDates = new Array<any>()
    measurements.forEach((element: any) => {
      const elem = element
      elem.measurementDate = timestampToDate(parseInt(element.measurementDate))
      temperatureMeasurementsWithTimestampsAsDates.push(elem)
    })

    setTemperatureMeasurements(temperatureMeasurementsWithTimestampsAsDates)
  }

  const recordButtonPosition = (event: any): void => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const closeMenu = (): void => {
    setMenuOpen(false)
  }

  const handleColorChangePicker = (color: any): void => {
    if (color) {
      setSelectedColor(color.hex)
    }
    console.log('selected color', color)
    setShowColorPicker(!showColorPicker)
  }

  const colorPicker = (): JSX.Element => {
    if (showColorPicker) {
      return <CirclePicker onChange={handleColorChangePicker} />
    }
    return <></>
  }

  const chart = (): JSX.Element => {
    if (chartType === BAR) {
      return (
        <BarChart key={chartKey} data={temperatureMeasurements}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='measurementDate' />
          <YAxis domain={[10, 40]} />
          <Tooltip />
          <Legend />
          <Bar dataKey='temperature' fill={selectedColor} />
        </BarChart>
      )
    } else if (chartType === LINE) {
      return (
        <LineChart key={chartKey} data={temperatureMeasurements}>
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='measurementDate' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='temperature' stroke={selectedColor} />
        </LineChart>
      )
    }
  }

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={recordButtonPosition}
        className={classes.button}
      >
        Select chart type
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
        open={menuOpen}
        onClose={closeMenu}
      >
        <MenuItem onClick={(): void => setChartType(BAR)}>Bar chart</MenuItem>
        <MenuItem onClick={(): void => setChartType(LINE)}>Line chart</MenuItem>
      </Menu>
      <Button
        variant='contained'
        color='primary'
        onClick={handleColorChangePicker}
        className={classes.button}
      >
        Select color
      </Button>
      {colorPicker()}
      <ResponsiveContainer
        width='95%'
        height={400}
        className={classes.container}
      >
        {chart()}
      </ResponsiveContainer>
    </>
  )
}
export default TemperatureChart
