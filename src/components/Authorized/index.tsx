import * as React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import usePermission from 'utils/permission'

interface Props extends ButtonProps {
  show?: boolean
  auth?: string
}

/**
 * @auth 权限名称
 * @show 是否显示
 */

const env = import.meta.env.MODE || 'development'

const Authorized: React.FC<Props> = React.memo(({ show = true, auth, ...props }): JSX.Element => {
  const { HasPermission } = usePermission()
  const isAuth = env === 'development' ? true : HasPermission(auth)

  return <>{true && show ? <Button {...props} /> : null}</> // 按钮暂时没有配置权限
})

export default Authorized
