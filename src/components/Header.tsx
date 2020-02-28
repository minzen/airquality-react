import React from 'react'
import { Box } from '@material-ui/core'
import logoImg from '../assets/img/logo_transparent.png'

const Header = () => {
  return (
    <Box width={1}> 
      <img src={logoImg} alt='logo' height={360} width={360} />
    </Box>
  )
}
export default Header
