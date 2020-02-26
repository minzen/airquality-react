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
import Measurement from '../components/MeasurementType'

interface TemperatureBarChartProps {
  data: Array<Measurement>
}

const TemperatureBarChart = (props: TemperatureBarChartProps) => {
  const temperatureMeasurements = props.data.map(
    ({ measurementDate, temperature }) => ({ measurementDate, temperature })
  )
  let temperatureMeasurementsWithTimestampsAsDates = new Array<any>()
  temperatureMeasurements.forEach(element => {
    let elem = element
    elem.measurementDate = timestampToDate(
      parseInt(element.measurementDate) * 1000
    )
    temperatureMeasurementsWithTimestampsAsDates.push(elem)
  })
  console.log(temperatureMeasurementsWithTimestampsAsDates)

  return (
    <ResponsiveContainer>
      <BarChart
        width={400}
        height={300}
        data={temperatureMeasurementsWithTimestampsAsDates}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='temperature' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default TemperatureBarChart
