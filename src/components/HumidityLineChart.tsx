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
import Measurement from './MeasurementType'
import { timestampToDate } from '../utils/utils'

interface HumidityLineChartProps {
  data: Array<Measurement>
}

const useStyles = makeStyles({
  container: {
    marginBottom: 20
  }
})

const HumidityLineChart = (props: HumidityLineChartProps) => {
  const classes = useStyles()
  const humidityMeasurements = props.data.map(
    ({ measurementDate, humidity }) => ({ measurementDate, humidity })
  )
  const humidityMeasurementsWithTimestampsAsDates = new Array<any>()
  humidityMeasurements.forEach(element => {
    let elem = element
    elem.measurementDate = timestampToDate(
      parseInt(element.measurementDate) * 1000
    )
    humidityMeasurementsWithTimestampsAsDates.push(elem)
  })
  console.log(humidityMeasurementsWithTimestampsAsDates)

  return (
    <ResponsiveContainer className={classes.container}>
      <LineChart
        width={400}
        height={300}
        data={humidityMeasurementsWithTimestampsAsDates}
      >
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
