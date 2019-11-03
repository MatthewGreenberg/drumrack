import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNav = styled.div`
  height: 58px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  position: relative;
`

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  max-width: 90%;
  width: 100vw;
  margin: 0 auto;
  height: 100%;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.textColor};
  padding: 0 1em;
  display: flex;
  height: 100%;
  align-items: center;
  &.selected {
    background: ${props => props.theme.lightGray};
  }
`
const Nav = props => {
  return (
    <StyledNav>
      <NavWrapper>
        <StyledLink activeClassName="selected" exact to="/">
          Home
        </StyledLink>
        <StyledLink activeClassName="selected" exact to="/media">
          Media
        </StyledLink>
        <StyledLink activeClassName="selected" exact to="/demo">
          Demo
        </StyledLink>
      </NavWrapper>
    </StyledNav>
  )
}

export default Nav
