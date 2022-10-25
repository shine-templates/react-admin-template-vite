import { memo } from 'react'
import Style from './Logo.module.scss'
import FullLogo from 'assets/svg/assets-logo-full.svg?component'
import MiniLogo from 'assets/svg/assets-t-logo.svg?component'

interface IProps {
  collapsed?: boolean
}

export default memo((props: IProps) => (
  <div className={Style.menuLogo}>{props.collapsed ? <MiniLogo /> : <FullLogo />}</div>
))
