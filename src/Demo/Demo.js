import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import Modal from '../Modal/Modal'
import TableComponent from '../Table/Table'
import { Typography } from 'antd'
import GenericForm from '../Form/Form'
const { Title } = Typography

const Demo = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  return (
    <Layout>
      <br />
      <h3>This is a demo</h3>
      <br />

      <TableComponent />
      <br />
      <Modal
        buttonText="Show modal"
        setModalIsVisible={setModalIsVisible}
        modalIsVisible={modalIsVisible}
        title="This is a test modal"
      >
        <Title level={4}>Add stuff here</Title>
        <br />
        <GenericForm setModalIsVisible={setModalIsVisible} />
      </Modal>
    </Layout>
  )
}

export default Demo
