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
import { Button, Menu, MenuItem } from '@material-ui/core'
import { timestampToDate } from '../utils/utils'
import { CirclePicker } from 'react-color'
import ChartProps from '../interfaces/ChartProps'
import { LINE, BAR } from '../general/constants'

const useStyles = makeStyles({
  container: {
    marginBottom: 50,
    backgroundColor: '#ffffff'
  },
  button: {
    margin: 5
  }
})

const HumidityChart = (props: ChartProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState(LINE)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8884d8')
  const humidityMeasurements = props.data.map(
    ({ measurementDate, humidity }) => ({ measurementDate, humidity })
  )
  const classes = useStyles()
  const humidityMeasurementsWithTimestampsAsDates = new Array<any>()
  humidityMeasurements.forEach(element => {
    const elem = element
    elem.measurementDate = timestampToDate(parseInt(element.measurementDate))
    humidityMeasurementsWithTimestampsAsDates.push(elem)
  })
  // console.log(humidityMeasurementsWithTimestampsAsDates)

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
        <BarChart data={humidityMeasurementsWithTimestampsAsDates}>
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
        <LineChart data={humidityMeasurementsWithTimestampsAsDates}>
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
