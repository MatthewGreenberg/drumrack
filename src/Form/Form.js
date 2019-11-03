import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker,
  Radio,
} from 'antd'

const { Option } = Select

const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
  labelAlign: 'left',
}

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]

const datePickerConfig = {
  rules: [{ type: 'object', required: true, message: 'Please select date' }],
}

const FormComponent = props => {
  const { getFieldDecorator } = props.form
  const handleSubmit = e => {
    e.preventDefault()

    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        console.log(err)
      }
      console.log('Received values of form: ', fieldsValue)
    })
  }
  return (
    <Form onSubmit={e => handleSubmit(e)} {...formItemLayout}>
      <Form.Item label="Name">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your name' }],
        })(<Input placeholder="Enter name..." />)}
      </Form.Item>
      <Form.Item label="Item #">
        {getFieldDecorator('radio-group', {
          rules: [
            {
              required: true,
              message: 'Please select a number',
            },
          ],
        })(
          <Radio.Group>
            <Radio value="a">item 1</Radio>
            <Radio value="b">item 2</Radio>
            <Radio value="c">item 3</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="DatePicker">
        {getFieldDecorator('date-picker', datePickerConfig)(<DatePicker />)}
      </Form.Item>
      <Form.Item label="Message">
        {getFieldDecorator('message', {
          rules: [
            {
              required: true,
              message: 'Please input your message',
            },
          ],
        })(<TextArea size="large" placeholder="Enter message.." />)}
      </Form.Item>
      <Row type="flex" justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

const GenericForm = Form.create({ name: 'Test' })(FormComponent)

export default GenericForm
