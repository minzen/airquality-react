import React from 'react'
import Grid from '@material-ui/core/Grid'
import AboutContentProps from '../interfaces/AboutContentProps'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  item: {
    height: 600
  }
})

const AboutContent = (props: AboutContentProps) => {
  const classes = useStyles()

  return (
    <Grid item xs className={classes.item}>
      <p>
        The Air Quality app visualizes some measurement values gathered at home
        by a Raspberry PI based system with some connected sensors. At the
        moment the values of temperature and humidity are provided. The gathered
        values are submitted to a document database (MongoDB) in the cloud by
        using{' '}
        <a href='https://github.com/minzen/airquality-storing'>
          a GraphQL (Apollo Server) powered API
        </a>
        .
      </p>
      <p>
        The database contains at the moment{' '}
        <strong>{props.numberOfMeasurements}</strong> measurements.
      </p>
    </Grid>
  )
}
export default AboutContent
