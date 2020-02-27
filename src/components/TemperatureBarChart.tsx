import React from 'react'
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

const TemperatureBarChart = (props: ChartProps) => {
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
    <ResponsiveContainer>
      <BarChart
        width={600}
        height={300}
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
