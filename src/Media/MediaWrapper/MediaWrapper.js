import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Layout from '../../Layout/Layout'
import MediaUploadContainer from '../MediaUploadContainer/MediaUploadContainer'
import MediaLibrary from '../MediaLibrary/MediaLibrary'

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

const MediaWrapper = () => {
  const { loading, error, data } = useQuery(ALL_ASSETS_QUERY)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <Layout>
      <MediaUploadContainer message="Upload media" />
      <MediaLibrary />
    </Layout>
  )
}

export default MediaWrapper
