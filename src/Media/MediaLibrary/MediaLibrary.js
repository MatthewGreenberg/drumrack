import React, { useState, useCallback } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { debounce } from 'lodash'
import gql from 'graphql-tag'
import { Pagination } from 'antd'
import MediaItem from '../MediaItem/MediaItem'
import styled from 'styled-components'
import MediaStats from '../MediaStats/MediaStats'
import MediaFilters from '../MediaFilters/MediaFilters'
import { down } from 'styled-breakpoints'

const MediaLibraryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 75px;

  ${down('md')} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
  }
  ${down('sm')} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
`

const MediaLibraryInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 3em 0;
`

const MediaLibrary = props => {
  const [activeAssets, setActiveAssets] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const numAssets = activeAssets.length

  const client = useApolloClient()

  const { assets } = client.readQuery({
    query: gql`
      query assets {
        assets {
          handle
          fileName
          size
          id
          mimeType
          url
          createdAt
        }
      }
    `,
  })

  const handleSearch = useCallback(
    debounce(val => setSearchInput(val), 300),
    []
  )

  const handleSelectMediaItem = activeAsset => {
    console.log(activeAsset)
    const index = activeAssets.indexOf(activeAsset)
    if (index > -1) {
      setActiveAssets(activeAssets.filter(asset => asset !== activeAsset))
    } else {
      setActiveAssets([...activeAssets, activeAsset])
    }
  }

  const firstImage = page === 1 ? 0 : (page - 1) * 12
  const sliceLength = page === 1 ? 12 : page * 12

  const renderAssets = () => {
    return assets
      .filter(asset =>
        asset.fileName.toLowerCase().includes(searchInput.toLowerCase())
      )
      .slice(
        firstImage,
        sliceLength > assets.length ? assets.length : sliceLength
      )
      .map(asset => {
        return (
          <MediaItem
            handleSelectMediaItem={handleSelectMediaItem}
            key={asset.url}
            asset={asset}
          />
        )
      })
  }

  return (
    <div>
      <MediaLibraryInfo>
        <MediaStats
          setActiveAssets={setActiveAssets}
          activeAssets={activeAssets}
          numAssets={numAssets}
        />
        <MediaFilters handleSearch={e => handleSearch(e.target.value)} />
      </MediaLibraryInfo>
      <br />
      <MediaLibraryStyled>{renderAssets()}</MediaLibraryStyled>
      <PaginationWrapper>
        <Pagination
          onChange={page => setPage(page)}
          defaultPageSize={12}
          total={assets.length}
        />
      </PaginationWrapper>
    </div>
  )
}

export default MediaLibrary
