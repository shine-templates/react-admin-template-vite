import { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Layout, Row } from 'antd'
import type { MenuProps } from 'antd'
import router, { IRouter } from 'router'
import { resolve } from 'utils/path'
import { useAppSelector, useAppDispatch } from 'store/store'
import { selectGlobal, handleOpenkeys } from 'store/modules/global'
import { SvgIcon } from 'components'
import Logo from './Logo'
import { selectAuth } from 'store/modules/authSlice'

const { SubMenu } = Menu

const renderMenuItems =
  (menu: IRouter[], parentPath = '') =>
  (auth: string[] = []) =>
    menu.map((item) => {
      const navigate = useNavigate()
      const { children, meta, path } = item

      if (!meta) {
        return null
      }

      const { Icon, title } = meta || {}
      const routerPath = resolve(parentPath, path)

      // if (!auth.includes(meta?.role || '')) {
      //   return null
      // }

      if (!children || children.length === 0) {
        return (
          <Menu.Item
            key={routerPath}
            icon={Icon ? <SvgIcon name={Icon} /> : undefined}
            onClick={() => navigate(routerPath)}
          >
            <Row align='middle'>{title}</Row>
          </Menu.Item>
        )
      }

      return (
        <SubMenu key={routerPath} title={title} icon={Icon ? <SvgIcon name={Icon} /> : undefined}>
          {renderMenuItems(children, routerPath)(auth)}
        </SubMenu>
      )
    })

export default memo(() => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const globalState = useAppSelector(selectGlobal)
  const { auth } = useAppSelector(selectAuth)

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => globalState.openKeys.indexOf(key) === -1)
    dispatch(handleOpenkeys(latestOpenKey ? [latestOpenKey] : []))
  }

  return (
    <Layout.Sider trigger={null} width={215} style={{ height: '100%' }} collapsible collapsed={globalState.collapsed}>
      <Logo collapsed={globalState.collapsed} />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        openKeys={globalState.openKeys}
        defaultOpenKeys={globalState.openKeys}
        onOpenChange={onOpenChange}
      >
        {renderMenuItems(router)(auth)}
      </Menu>
    </Layout.Sider>
  )
})
