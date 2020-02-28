import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { timestampToDate } from '../utils/utils'
import ChartProps from '../interfaces/ChartProps'

const useStyles = makeStyles({
  container: {
    marginBottom: 50,
    backgroundColor: '#ffffff'
  }
})

const HumidityLineChart = (props: ChartProps) => {
  const humidityMeasurements = props.data.map(
    ({ measurementDate, humidity }) => ({ measurementDate, humidity })
  )
  const classes = useStyles()
  const humidityMeasurementsWithTimestampsAsDates = new Array<any>()
  humidityMeasurements.forEach(element => {
    let elem = element
    elem.measurementDate = timestampToDate(parseInt(element.measurementDate))
    humidityMeasurementsWithTimestampsAsDates.push(elem)
  })
  // console.log(humidityMeasurementsWithTimestampsAsDates)

  return (
    <ResponsiveContainer width='95%' height={400} className={classes.container}>
      <LineChart data={humidityMeasurementsWithTimestampsAsDates}>
        <CartesianGrid strokeDasharray='5 5' />
        <XAxis dataKey='measurementDate' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='humidity' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  )
}
export default HumidityLineChart
