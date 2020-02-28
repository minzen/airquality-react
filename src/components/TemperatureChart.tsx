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

const useStyles = makeStyles({
  container: {
    marginBottom: 30,
    backgroundColor: '#ffffff'
  }
})

const TemperatureChart = (props: ChartProps) => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState('bar')
  const classes = useStyles()
  const temperatureMeasurements = props.data.map(
    ({ measurementDate, temperature }) => ({ measurementDate, temperature })
  )
  let temperatureMeasurementsWithTimestampsAsDates = new Array<any>()
  temperatureMeasurements.forEach(element => {
    let elem = element
    elem.measurementDate = timestampToDate(parseInt(element.measurementDate))
    temperatureMeasurementsWithTimestampsAsDates.push(elem)
  })
  // console.log(temperatureMeasurementsWithTimestampsAsDates)

  const recordButtonPosition = (event: any) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const chart = () => {
    if (chartType === 'bar') {
      return (
        <BarChart data={temperatureMeasurementsWithTimestampsAsDates}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='measurementDate' />
          <YAxis domain={[10, 40]} />
          <Tooltip />
          <Legend />
          <Bar dataKey='temperature' fill='#8884d8' />
        </BarChart>
      )
    } else if (chartType === 'line') {
      return (
        <LineChart data={temperatureMeasurementsWithTimestampsAsDates}>
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='measurementDate' />
          <YAxis domain={[10, 40]}/>
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='temperature' stroke='#8884d8' />
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
        <MenuItem onClick={() => setChartType('bar')}>Bar chart</MenuItem>
        <MenuItem onClick={() => setChartType('line')}>Line chart</MenuItem>
      </Menu>

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
