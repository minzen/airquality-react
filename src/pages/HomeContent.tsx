import React from 'react'

interface HomeContentProps {
    numberOfMeasurements: number
}

const HomeContent = (props: HomeContentProps) => {
    return (
        <>
        <p>
            The Air Quality app visualizes some measurement values gathered at home by a Raspberry PI based system with some connected sensors. At the moment the values of temperature and humidity are provided. The gathered values are submitted to a document database (MongoDB) in the cloud by using <a href="https://github.com/minzen/airquality-storing">a GraphQL (Apollo Server) powered API</a>.    
        </p>
        <p>
            The database contains at the moment <strong>{props.numberOfMeasurements}</strong> measurements.
        </p>
        </>
    )
}
export default HomeContent