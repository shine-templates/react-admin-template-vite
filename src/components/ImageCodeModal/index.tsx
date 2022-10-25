import React from 'react'
import { Input, Button, Modal, message } from 'antd'
import { debounce } from 'lodash'
import Styles from './textlogin.module.scss'
import './textLogin.css'

export type Value = {
  value: string
  key: string
  code: string
}

const RenderModal: React.FC<{
  visible: boolean
  onCancel: () => void
  onCinfirm: (value: Value) => void
}> = React.memo(({ visible, onCancel, onCinfirm }) => {
  const [captcha, setCaptcha] = React.useState({ value: '', key: '', code: '' })

  React.useEffect(() => {
    // imageCode().then((res) => {
    //   setCaptcha({ ...captcha, ...res.data })
    // })
  }, [])

  const refresh = (flag?: boolean) => {
    let current = {}
    if (flag) {
      current = { value: '' }
    } else {
      current = { ...captcha }
    }
    // imageCode().then((res) => {
    //   setCaptcha({ ...current, ...res.data })
    // })
  }

  const submitHandler = () => {
    if (captcha.value) {
      onCinfirm(captcha)
    } else {
      message.error('请输入验证码')
    }
  }

  const reset = () => {
    refresh(true)
  }

  return (
    <Modal
      destroyOnClose
      width={502}
      centered
      title='图形验证码'
      visible={visible}
      footer={null}
      onCancel={onCancel}
      afterClose={() => {
        reset()
      }}
    >
      <div className={Styles.modalWrapper}>
        <div>
          <span className={Styles.text_1}>请输入图形验证码</span>
          <span
            className={Styles.text_2}
            onClick={debounce(() => {
              refresh()
            }, 500)}
          >
            换一个
          </span>
        </div>

        <div className={Styles.code_area}>
          <img src={captcha.code} alt='图形验证码加载失败' />
        </div>

        <div>
          <Input
            placeholder='请输入图形验证码'
            className='input_style'
            value={captcha.value}
            onChange={(e) => {
              setCaptcha({ ...captcha, value: e.target.value })
            }}
          />
        </div>

        <Button
          type='primary'
          block
          onClick={() => {
            submitHandler()
          }}
          style={{
            marginTop: 40,
            width: 440,
            height: 58,
            background: '#1379FF',
            borderRadius: 11,
          }}
        >
          确定
        </Button>
      </div>
    </Modal>
  )
})
export default RenderModal
