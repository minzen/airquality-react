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
import ChartProps from '../interfaces/ChartProps'
import { LINE, BAR } from '../general/constants'

const useStyles = makeStyles({
  container: {
    marginBottom: 50,
    backgroundColor: '#ffffff'
  }
})

const HumidityChart = (props: ChartProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState(LINE)
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

  const chart = (): JSX.Element => {
    if (chartType === BAR) {
      return (
        <BarChart data={humidityMeasurementsWithTimestampsAsDates}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='measurementDate' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='humidity' fill='#8884d8' />
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
          <Line type='monotone' dataKey='humidity' stroke='#8884d8' />
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
