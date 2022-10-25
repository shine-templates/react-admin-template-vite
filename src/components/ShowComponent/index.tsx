import { FC, ReactElement } from 'react'

const ShowComponent: FC<{ children: ReactElement; visible: boolean }> = ({ children, visible }) => {
  return <>{visible ? children : null}</>
}

export default ShowComponent
