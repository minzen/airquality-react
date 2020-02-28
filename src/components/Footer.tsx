import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import BarChartIcon from '@material-ui/icons/BarChart'
// import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'
import {ABOUT, /*SETTINGS,*/ VISUALIZATIONS} from '../general/constants'

const useStyles = makeStyles({
  bottomNavi: {
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
        className={classes.bottomNavi}
      >
        <BottomNavigationAction label='Info' icon={<InfoIcon />} value={ABOUT} />
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
