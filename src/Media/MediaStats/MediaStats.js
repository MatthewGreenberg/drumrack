import React from 'react'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'

export const ALL_ASSETS_QUERY = gql`
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
`

const DELETE_ASSET_MUTATION = gql`
  mutation deleteAsset($id: ID!) {
    deleteAsset(where: { id: $id }) {
      id
    }
  }
`
const MediaStatsStyled = styled.div`
  margin-top: 2em;
  margin-bottom: 0.5em;
  display: 'flex';
  align-items: 'center';
`

const MediaStats = props => {
  const { numAssets, activeAssets, setActiveAssets } = props
  const [deleteAsset] = useMutation(DELETE_ASSET_MUTATION)
  const handleDeleteAssets = () => {
    activeAssets.forEach(async asset => {
      const { id } = asset
      try {
        deleteAsset({
          variables: {
            id,
          },
          update: (proxy, { data: { deleteAsset } }) => {
            const data = proxy.readQuery({
              query: ALL_ASSETS_QUERY,
            })
            proxy.writeQuery({
              query: ALL_ASSETS_QUERY,
              data: {
                ...data,
                assets: data.assets.filter(
                  asset => asset.id !== deleteAsset.id
                ),
              },
            })
          },
        })
        toast.success(`${asset.fileName} was sucessfully deleted`, {
          position: toast.POSITION.TOP_RIGHT,
        })
        setActiveAssets([])
      } catch (error) {
        toast.error(`${asset.fileName} failed to delete`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }

  return (
    <MediaStatsStyled>
      {`${numAssets} Files Selected`}
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => (numAssets > 0 ? handleDeleteAssets() : {})}
      >
        <MdDelete
          style={{
            color: numAssets > 0 ? '#3250F0' : '#2D2D2D',
            margin: '0 0 0 3em',
            verticalAlign: 'top',
          }}
          size="20px"
        />{' '}
        <span style={{ color: numAssets > 0 ? '#3250F0' : '#2D2D2D' }}>
          Delete Selected
        </span>
      </span>
    </MediaStatsStyled>
  )
}

export default MediaStats
