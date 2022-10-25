import React, { memo, FC, useEffect, useState } from 'react'
import { Avatar, Dropdown, Layout, Menu, Row, Modal } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, LoginOutlined, EditOutlined } from '@ant-design/icons'
import Styles from './Header.module.scss'
import { useAppSelector, useAppDispatch } from 'store/store'
import { selectGlobal, toggleMenu } from 'store/modules/global'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import configs from 'configs'
import corra from 'assets/images/avatar.jpg'
const { Header } = Layout

interface IHeaderProps {
  showMenu?: boolean
}

const User: FC = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ userName: 'Corra' })

  useEffect(() => {
    const userName = sessionStorage.getItem(configs.SESSION_KEY + 'name')
    if (userName) {
      setUserInfo({ userName })
    }
  }, [])

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <>
          修改手机号
          <EditOutlined style={{ marginLeft: 5 }} />
        </>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          Modal.confirm({
            title: '确认退出登录？',
            onOk: () => {
              sessionStorage.clear()
              navigate('/login', { replace: true })
            },
          })
        }}
        key={2}
      >
        <>
          退出登录
          <LoginOutlined style={{ marginLeft: 5 }} />
        </>
      </Menu.Item>
    </Menu>
  )

  return (
    <Row align='middle'>
      <Avatar
        style={{
          marginLeft: 30,
        }}
        src={corra}
      />
      <Dropdown overlay={menu}>
        <span style={{ cursor: 'pointer', paddingLeft: 10, marginRight: 20 }}>{userInfo.userName}</span>
      </Dropdown>
    </Row>
  )
}

export default memo((props: IHeaderProps) => {
  const globalState = useAppSelector(selectGlobal)
  const dispatch = useAppDispatch()

  return (
    <Header className={classNames([Styles.headerPanel])}>
      {React.createElement(globalState.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => dispatch(toggleMenu(!globalState.collapsed)),
      })}
      <User />
    </Header>
  )
})
