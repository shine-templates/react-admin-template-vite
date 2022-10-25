import React from 'react'
import { Form, Input, Button, Col, Row, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useCountDown } from 'hooks'
import { ImageCodeModal, Value } from 'components'
import Styles from './textlogin.module.scss'
import './textLogin.css'

export default () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { countdown, setupCountdown } = useCountDown(60)
  const [visible, setVisible] = React.useState(false)

  const onFinish = (values: { phone: string; captcha: string }) => {
    navigate('/dashboard', { replace: true })
  }

  const getCaptcha = (value: Value) => {
    const phone = form.getFieldValue('phone')
    setVisible(false)
    if (phone) {
      setupCountdown()
    } else {
      message.error('请输入手机号!')
    }
  }

  return (
    <div className={Styles.formContainer}>
      <Form form={form} name='text_login' onFinish={onFinish}>
        <Form.Item name='phone' rules={[{ required: true, message: '用户名/手机号输入有误' }]}>
          <Input placeholder='请输入手机号/用户名' className='input_style' />
        </Form.Item>

        <Form.Item>
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item name='captcha' noStyle rules={[{ required: true, message: '请输入正确的验证码' }]}>
                <Input className='input_captcha' placeholder='请输入验证码' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button
                disabled={countdown > 0}
                onClick={() => {
                  setVisible(true)
                }}
                style={{ width: 130, height: 58, background: '#fff', borderRadius: 6 }}
              >
                {countdown === 0 ? '获取验证码' : `${countdown}秒后可重发`}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            block
            htmlType='submit'
            style={{
              marginTop: 40,
              width: 440,
              height: 58,
              background: '#1379FF',
              borderRadius: 11,
            }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>

      <ImageCodeModal
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        onCinfirm={(value) => {
          getCaptcha(value)
        }}
      />
    </div>
  )
}
