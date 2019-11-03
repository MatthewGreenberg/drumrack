import React from 'react'
import { Input } from 'antd'
import styled from 'styled-components'

const { Search } = Input

const MediaFiltersStyled = styled.div`
  display: flex;
  align-items: center;
`

const MediaFilters = props => {
  const { handleSearch } = props
  return (
    <MediaFiltersStyled>
      <Search
        placeholder="input search text"
        onChange={e => handleSearch(e)}
        style={{ width: 200 }}
      />
    </MediaFiltersStyled>
  )
}

export default MediaFilters
