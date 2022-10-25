import React from 'react'
import { Tabs } from 'antd'
import Login from './components/Login'
import TextLogin from './components/TextLogin'
import ResetPassword from './components/ResetPassword'
import Styles from './index.module.scss'
import './index.scss'
import configs from 'configs'

const { TabPane } = Tabs

export default () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <div className={Styles.leftWrapper}></div>
        <div className={Styles.formWrapper}>
          <p className={Styles.systemTitle}>{configs.SYSTEM_TITLE}</p>
          {visible ? (
            <ResetPassword
              backHandler={() => {
                setVisible(false)
              }}
            />
          ) : (
            <div className='login-tab'>
              <Tabs centered tabBarGutter={126} tabBarStyle={{ fontSize: 26 }}>
                <TabPane tab='密码登录' key='1'>
                  <Login
                    resetPassword={() => {
                      setVisible(true)
                    }}
                  />
                </TabPane>
                <TabPane tab='短信登录' key='2'>
                  <TextLogin />
                </TabPane>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
