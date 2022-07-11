import React from 'react'
import { Box } from '@material-ui/core'
import logoImg from '../assets/img/logo_transparent.png'

const Header = (): JSX.Element => {
  return (
    <>
      <div>
        <img src={logoImg} alt='logo' height={360} width={360} />
      </div>
    </>
  )
}
export default Header
