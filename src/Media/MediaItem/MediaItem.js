import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Button } from 'antd'
import posed from 'react-pose'

const ItemWrapperProps = posed.div({
  open: { opacity: 1, transform: 'translateY(0px)' },
  closed: {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: { duration: 600 },
  },
})

const MediaItemWrapper = styled(ItemWrapperProps)`
  flex-direction: column;
  cursor: pointer;
`

const ButtonStyled = styled(Button)`
  /* width: 100px;
  height: 100px; */
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25) !important;
  margin-top: 5px;
`
const AudioStyled = styled.audio`
  width: 100%;
  cursor: pointer;
  object-fit: cover;
  transition: outline 0.2s cubic-bezier(0.17, 0.67, 0.66, 1.46);
  filter: ${props =>
    props.isActive
      ? 'drop-shadow(0 3px 9px rgba(0, 0, 0, 0.16)) sepia(50%)'
      : 'drop-shadow(0 3px 9px rgba(0, 0, 0, 0.16))'};
  &:active,
  &:focus {
    outline: none;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const MediaItem = props => {
  const [isActive, setIsActive] = useState(false)
  const [isOpen, setIsopen] = useState(false)
  const { asset, handleSelectMediaItem } = props

  useEffect(() => {
    // Update the document title using the browser API
    setIsopen(true)
  }, [])

  let el = null
  el = (
    <AudioStyled
      isActive={isActive}
      src={`${asset.url}`}
      controls
      type="audio/mpeg"
    />
  )

  return (
    <MediaItemWrapper key={asset.id} pose={isOpen ? 'open' : 'closed'}>
      {el}
      <InfoWrapper
        onClick={() => {
          handleSelectMediaItem(asset)
          setIsActive(!isActive)
        }}
      >
        <div>
          <h3
            style={{
              paddingTop: '0.5em',
              fontSize: '16px',
              maxWidth: '230px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: `${isActive ? 'red' : '#2D2D2D'}`,
            }}
          >
            {asset.fileName}
          </h3>
          <h5 style={{ margin: '-0.75em 0 1em', fontWeight: 400 }}>
            Created on: {moment(asset.createdAt).format('MMM Do YYYY')}
          </h5>
        </div>
      </InfoWrapper>
    </MediaItemWrapper>
  )
}

export default MediaItem
