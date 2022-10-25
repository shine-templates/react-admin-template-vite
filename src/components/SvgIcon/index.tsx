import React from 'react'
import Styles from './style.module.scss'

const SvgIcon: React.FC<{ name: string; prefix?: string; color?: string }> = ({
  name,
  prefix = 'icon',
  color = '#333',
  ...props
}) => {
  const symbolId = `#${prefix}-${name}`
  return (
    <i aria-hidden='true' className='anticon'>
      <svg {...props} className={Styles.svgClass}>
        <use href={symbolId} fill={color} />
      </svg>
    </i>
  )
}

export default SvgIcon
