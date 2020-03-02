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
import ChartProps from '../interfaces/ChartProps'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { CirclePicker } from 'react-color'
import { LINE, BAR } from '../general/constants'

const useStyles = makeStyles({
  container: {
    marginBottom: 30,
    backgroundColor: '#ffffff'
  },
  button: {
    margin: 5
  }
})

const TemperatureChart = (props: ChartProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState(BAR)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#8884d8')
  const classes = useStyles()
  const temperatureMeasurements = props.data.map(
    ({ measurementDate, temperature }) => ({ measurementDate, temperature })
  )
  const temperatureMeasurementsWithTimestampsAsDates = new Array<any>()
  temperatureMeasurements.forEach(element => {
    const elem = element
    elem.measurementDate = timestampToDate(parseInt(element.measurementDate))
    temperatureMeasurementsWithTimestampsAsDates.push(elem)
  })
  // console.log(temperatureMeasurementsWithTimestampsAsDates)

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
        <BarChart data={temperatureMeasurementsWithTimestampsAsDates}>
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
        <LineChart data={temperatureMeasurementsWithTimestampsAsDates}>
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
