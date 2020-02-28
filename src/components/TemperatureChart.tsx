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
import { LINE, BAR } from '../general/constants'

const useStyles = makeStyles({
  container: {
    marginBottom: 30,
    backgroundColor: '#ffffff'
  }
})

const TemperatureChart = (props: ChartProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [chartType, setChartType] = useState(BAR)
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

  const chart = (): JSX.Element => {
    if (chartType === BAR) {
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
    } else if (chartType === LINE) {
      return (
        <LineChart data={temperatureMeasurementsWithTimestampsAsDates}>
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='measurementDate' />
          <YAxis />
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
export default TemperatureChart
