import * as React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'

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
  return <>{true && show ? <Button {...props} /> : null}</>
})

export default Authorized
