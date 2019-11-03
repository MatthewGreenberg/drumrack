import React from 'react'
import ReactFilestack from 'filestack-react'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/react-hooks'
import { MdAdd } from 'react-icons/md'

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

const CREATE_ASSET_MUTATION = gql`
  mutation createAsset(
    $handle: String!
    $fileName: String!
    $size: Float
    $mimeType: String!
  ) {
    createAsset(
      data: {
        handle: $handle
        fileName: $fileName
        size: $size
        mimeType: $mimeType
        status: PUBLISHED
      }
    ) {
      handle
      fileName
      size
      mimeType
      status
      url
      id
      createdAt
    }
  }
`

const MediaUpload = props => {
  const { apikey } = props
  const [createAsset, { loading }] = useMutation(CREATE_ASSET_MUTATION)

  const handleCreatAsset = res => {
    res.filesUploaded.forEach(async file => {
      const { filename, handle, mimetype, size } = file
      try {
        createAsset({
          variables: {
            mimeType: mimetype,
            fileName: filename,
            handle,
            mimetype,
            size,
          },
          update: (proxy, { data: { createAsset } }) => {
            const data = proxy.readQuery({
              query: ALL_ASSETS_QUERY,
            })
            proxy.writeQuery({
              query: ALL_ASSETS_QUERY,
              data: {
                ...data,
                assets: [createAsset, ...data.assets],
              },
            })
          },
        })
        toast.success(`${filename} was sucessfully uploaded!`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      } catch (error) {
        toast.error(`${filename} failed to upload`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }
  return (
    <ReactFilestack
      actionOptions={{
        maxFiles: 20,
        accept: ['audio/*'],
        fromSources: [
          'local_file_system',
          'url',
          'imagesearch',
          'googledrive',
          'dropbox',
        ],
      }}
      customRender={({ onPick }) => (
        <MdAdd
          style={{
            fontSize: '50px',
            cursor: 'pointer',
          }}
          name="plus circle"
          onClick={onPick}
          color="#2D2D2D"
        />
      )}
      apikey={apikey}
      onSuccess={res => handleCreatAsset(res)}
    />
  )
}

export default MediaUpload
