import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { Button, Menu, MenuItem, CircularProgress } from '@material-ui/core'
import { timestampToDate } from '../utils/utils'
import { CirclePicker } from 'react-color'
import { LINE, BAR } from '../general/constants'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { GET_HUMIDITY_MEASUREMENTS, HUMIDITY_ADDED } from '../general/queries'

const useStyles = makeStyles({
  container: {
    marginBottom: 50,
    backgroundColor: '#ffffff'
  },
  button: {
    margin: 5
  }
})

const HumidityChart = () => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState(LINE)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8884d8')
  const [humidityMeasurements, setHumidityMeasurements] = useState([])
  const [chartKey, setChartKey] = useState('')
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_HUMIDITY_MEASUREMENTS)
  useSubscription(HUMIDITY_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(
        'Humidity measurement added to the database:',
        subscriptionData.data
      )
      const ts = subscriptionData.data.measurementAdded.measurementDate
      const newMeasurement = subscriptionData.data.measurementAdded
      newMeasurement.measurementDate = timestampToDate(parseInt(ts))
      console.log('humidity', newMeasurement.humidity)
      console.log('before',humidityMeasurements)
      humidityMeasurements.push(newMeasurement)
      console.log('after',humidityMeasurements)
      setHumidityMeasurements(humidityMeasurements)
      // Set the key of the chart to make it re-render on arrival of a new measurement
      setChartKey(newMeasurement.measurementDate)
    }
  })

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <p>error</p>
  }
  if (data && humidityMeasurements.length === 0) {
    const measurementsCount = data.measurements.length
    const measurements = data.measurements.reverse().slice(0, measurementsCount)
    const humidityMeasurementsWithTimestampsAsDates = new Array<any>()
    measurements.forEach((element: any) => {
      const elem = element
      elem.measurementDate = timestampToDate(parseInt(element.measurementDate))
      humidityMeasurementsWithTimestampsAsDates.push(elem)
    })
    setHumidityMeasurements(humidityMeasurementsWithTimestampsAsDates)
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
        <BarChart key={chartKey} data={humidityMeasurements}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='measurementDate' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='humidity' fill={selectedColor} />
        </BarChart>
      )
    } else if (chartType === LINE) {
      return (
        <LineChart key={chartKey} data={humidityMeasurements}>
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='measurementDate' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='humidity' stroke={selectedColor} />
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
export default HumidityChart
