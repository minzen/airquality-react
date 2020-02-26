import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import BarChartIcon from '@material-ui/icons/BarChart'
// import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'
import {HOME, /*SETTINGS,*/ VISUALIZATIONS} from '../general/constants'

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#D3D3D3'
  }
})

const Footer = ({setActivePage}:any) => {
  const classes = useStyles()
  let value
  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          console.log('setting page navigation to', newValue)
          setActivePage(newValue)
        }}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction label='Home' icon={<HomeIcon />} value={HOME} />
        <BottomNavigationAction
          label='Visualizations'
          icon={<BarChartIcon />}
          value={VISUALIZATIONS}
        />
        {/* <BottomNavigationAction label='Settings' icon={<SettingsIcon />} value={SETTINGS}/> */}
      </BottomNavigation>{' '}
    </>
  )
}
export default Footer
