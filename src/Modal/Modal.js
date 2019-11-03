import React from 'react'
import { Modal as ModalComponent, Button } from 'antd'

/*
  Hey I'm the Modal component! 
  I am controlled and need a function to control a modalIsVisible state!
  I take children as props. 
*/
const Modal = props => {
  const { buttonText, setModalIsVisible, modalIsVisible, title } = props
  return (
    <div>
      <Button type="primary" onClick={() => setModalIsVisible(true)}>
        {buttonText}
      </Button>
      <ModalComponent
        title={title}
        footer={null}
        style={{ top: 20 }}
        visible={modalIsVisible}
        width="80%"
        style={{ maxWidth: '800px' }}
        onOk={() => {
          setModalIsVisible(false)
        }}
        onCancel={() => setModalIsVisible(false)}
      >
        {props.children}
      </ModalComponent>
    </div>
  )
}

export default Modal
