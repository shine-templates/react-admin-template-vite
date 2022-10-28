import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import configs from 'configs'
import Styles from './login.module.scss'
import './login.css'
import { useEffect } from 'react'

const fileds = {
  phone: localStorage.getItem(configs.SESSION_KEY + 'phone') || '',
  password: localStorage.getItem(configs.SESSION_KEY + 'password') || '',
  remember: JSON.parse(localStorage.getItem(configs.SESSION_KEY + 'remember') as string),
}

const Login: React.FC<{ resetPassword: () => void }> = ({ resetPassword }) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // useEffect(() => {
  //   form.setFieldsValue(fileds)
  // }, [form])

  const onFinish = (values: { phone: string; password: string; remember: boolean }) => {
    navigate('/', { replace: true })
  }

  return (
    <div className={Styles.formContainer}>
      <Form
        form={form}
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
        initialValues={{ phone: '123456789', password: 'admin', remember: true }}
      >
        <Form.Item name='phone' rules={[{ required: true, message: '用户名/手机号输入有误' }]}>
          <Input placeholder='请输入手机号/用户名' className='input_style' />
        </Form.Item>

        <Form.Item name='password' rules={[{ required: true, message: '密码输入有误' }]}>
          <Input type='password' placeholder='请输入密码' className='input_style' />
        </Form.Item>

        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item noStyle>
            <span onClick={resetPassword} className={Styles.loginFormForgot}>
              忘记密码？
            </span>
          </Form.Item>
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
    </div>
  )
}

export default Login
