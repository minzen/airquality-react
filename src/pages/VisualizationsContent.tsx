import React from 'react'
import { VictoryBar, VictoryChart } from 'victory'

type Measurement = {
  measurementDate: string
  temperature: number
  humidity: number
}

interface VisualizationContentProps {
  measurements: Array<Measurement>
}

const timestampToDate = (ts: any) => {
    if (ts) {
        // TODO: Check the validity of the TS
        return new Intl.DateTimeFormat('de-DE', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts)
    }
    return null
}


const VisualizationsContent = (props: VisualizationContentProps) => {
    const temperatureMeasurements = props.measurements.map(({measurementDate, temperature}) => ({measurementDate, temperature}))
    temperatureMeasurements.forEach(element => {
        console.log(element.measurementDate, timestampToDate(parseInt(element.measurementDate) * 1000))
    });
  return (
    <VictoryChart>
      <VictoryBar data={temperatureMeasurements} x="measurementDate" y="temperature"/>
    </VictoryChart>
  )
}
export default VisualizationsContent
