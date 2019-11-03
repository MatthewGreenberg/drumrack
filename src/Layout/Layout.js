import React from 'react'
import styled from 'styled-components'

const LayoutStyled = styled.div`
  max-width: 90%;
  width: 100vw;
  margin: 0 auto;
`

const Layout = props => {
  return <LayoutStyled>{props.children}</LayoutStyled>
}

export default Layout
