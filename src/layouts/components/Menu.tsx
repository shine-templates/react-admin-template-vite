import { memo, useCallback } from 'react'
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom'
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
  (auth: string[] = [], navigate: NavigateFunction) =>
    menu.map((item) => {
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
            onClick={() => {
              navigate(routerPath)
            }}
          >
            <Row align='middle'>{title}</Row>
          </Menu.Item>
        )
      }

      return (
        <SubMenu key={routerPath} title={title} icon={Icon ? <SvgIcon name={Icon} /> : undefined}>
          {renderMenuItems(children, routerPath)(auth, navigate)}
        </SubMenu>
      )
    })

export default memo(() => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const globalState = useAppSelector(selectGlobal)
  const { auth } = useAppSelector(selectAuth)

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => globalState.openKeys.indexOf(key) === -1)
    dispatch(handleOpenkeys(latestOpenKey ? [latestOpenKey] : []))
  }

  const renderMenu = useCallback(() => {
    return renderMenuItems(router)(auth, navigate) || <></>
  }, [auth])

  return (
    <Layout.Sider trigger={null} width={215} collapsible collapsed={globalState.collapsed}>
      <Logo collapsed={globalState.collapsed} />
      <Menu
        theme='dark'
        mode='inline'
        openKeys={globalState.openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[location.pathname]}
      >
        {renderMenu()}
      </Menu>
    </Layout.Sider>
  )
})
