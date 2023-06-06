import React, { memo, FC, useEffect, useState } from 'react'
import { Avatar, Dropdown, Layout, Menu, Row, Modal } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, LoginOutlined, EditOutlined } from '@ant-design/icons'
import Styles from './Header.module.scss'
import { useAppSelector, useAppDispatch } from 'store/store'
import { selectGlobal, toggleMenu } from 'store/modules/global'
import { useNavigate } from 'react-router-dom'
import configs from 'configs'
import corra from 'assets/images/avatar.jpg'
import type { MenuProps } from 'antd/es/menu'
import Breadcrumb from './Breadcrumb'
const { Header } = Layout

interface IHeaderProps {
  showMenu?: boolean
}

type MenuItem = Required<MenuProps>['items'][number]

const User: FC = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ userName: 'Corra' })

  useEffect(() => {
    const userName = sessionStorage.getItem(configs.SESSION_KEY + 'name')
    if (userName) {
      setUserInfo({ userName })
    }
  }, [])

  const items: MenuItem[] = [
    { label: '修改密码', key: '0', icon: <EditOutlined />, onClick: () => {} },
    { type: 'divider' },
    {
      label: '退出登录',
      key: '1',
      icon: <LoginOutlined />,
      onClick: () => {
        Modal.confirm({
          title: '确认退出登录？',
          onOk: () => {
            sessionStorage.clear()
            navigate('/login', { replace: true })
          },
        })
      },
    },
  ]

  return (
    <Row align='middle'>
      <Avatar src={corra} className={Styles.avatar} />
      <Dropdown overlay={<Menu items={items} />}>
        <span className={Styles.userName}>{userInfo.userName}</span>
      </Dropdown>
    </Row>
  )
}

export default memo((props: IHeaderProps) => {
  const globalState = useAppSelector(selectGlobal)
  const dispatch = useAppDispatch()

  return (
    <Header className={Styles.headerPanel}>
      <Row align='middle'>
        {React.createElement(globalState.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => dispatch(toggleMenu(!globalState.collapsed)),
        })}
        {/* <Breadcrumb style={{ marginLeft: 20 }} /> */}
      </Row>
      <User />
    </Header>
  )
})
