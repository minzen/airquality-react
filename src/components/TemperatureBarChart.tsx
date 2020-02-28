import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { timestampToDate } from '../utils/utils'
import ChartProps from '../interfaces/ChartProps'

const useStyles = makeStyles({
  container: {
    marginBottom: 30,
    backgroundColor: '#ffffff'
  }
})

const TemperatureBarChart = (props: ChartProps) => {
  const classes = useStyles()
  const temperatureMeasurements = props.data.map(
    ({ measurementDate, temperature }) => ({ measurementDate, temperature })
  )
  let temperatureMeasurementsWithTimestampsAsDates = new Array<any>()
  temperatureMeasurements.forEach(element => {
    let elem = element
    elem.measurementDate = timestampToDate(
      parseInt(element.measurementDate)
    )
    temperatureMeasurementsWithTimestampsAsDates.push(elem)
  })
  // console.log(temperatureMeasurementsWithTimestampsAsDates)

  return (
    <ResponsiveContainer width="95%" height={400} className={classes.container}>
      <BarChart
        data={temperatureMeasurementsWithTimestampsAsDates}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='measurementDate' />
        <YAxis domain={[10, 40]} />
        <Tooltip />
        <Legend />
        <Bar dataKey='temperature' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default TemperatureBarChart
