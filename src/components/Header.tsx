import React from 'react'
import { Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import logoImg from '../assets/img/logo_transparent.png'

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '50.00%', 
  },
})

const Header = () => {
  const classes = useStyles()
  return (
    <Card>
      <CardMedia image={logoImg} title='Logo' className={classes.media} />
      <CardContent></CardContent>
    </Card>
  )
}
export default Header
