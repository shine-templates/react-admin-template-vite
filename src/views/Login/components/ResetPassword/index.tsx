import React from 'react'
import { Form, Input, Button, Col, Row, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useCountDown } from 'hooks'
import { ImageCodeModal, Value } from 'components'
import Styles from './textlogin.module.scss'
import './textLogin.css'

const ResetPassword: React.FC<{ backHandler: () => void }> = ({ backHandler }) => {
  const [form] = Form.useForm()
  const { countdown, setupCountdown } = useCountDown(60)
  const [visible, setVisible] = React.useState(false)

  const onFinish = (values: { phone: string; captcha: string; newPwd: string }) => {
    backHandler()
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
      <div className={Styles.titleWrapper}>
        <ArrowLeftOutlined style={{ fontSize: 25, cursor: 'pointer', color: '#fff' }} onClick={backHandler} />
        <div className={Styles.textStyle}>忘记密码</div>
      </div>
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
                type='primary'
                disabled={countdown > 0}
                onClick={() => {
                  setVisible(true)
                }}
                style={{ width: 130, height: 58, borderRadius: 6, background: '#3B76FF' }}
              >
                {countdown === 0 ? '获取验证码' : `${countdown}秒后可重发`}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name='newPwd' rules={[{ required: true, message: '8-16位数字、字母组合密码' }]}>
          <Input placeholder='请输入新密码，8-16位数字、字母组合' className='input_style' />
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
            确认修改
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

export default ResetPassword
