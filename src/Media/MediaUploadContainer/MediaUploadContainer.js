import React from 'react'
import MediaUpload from '../MediaUpload/MediaUpload'
import styled from 'styled-components'
import { Typography } from 'antd'

const { Title } = Typography

const StyledMediaUploadContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0em;
  background: ${props => props.theme.lightGray};
  margin: 2em 0;
`

const StyledTitle = styled(Title)`
  color: ${props => props.theme.blue} !important;
  margin-left: 0.25em !important;
`

const MediaUploadContainer = props => {
  return (
    <StyledMediaUploadContainer>
      <MediaUpload apikey={process.env.REACT_APP_FILESTACK_KEY} />{' '}
      <StyledTitle level={4}>{props.message ? props.message : ''}</StyledTitle>
    </StyledMediaUploadContainer>
  )
}

export default MediaUploadContainer
