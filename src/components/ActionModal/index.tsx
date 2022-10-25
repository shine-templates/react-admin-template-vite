import type { ModalProps } from 'antd/lib/modal'
import Modal from 'antd/lib/modal'
import { ReactElement, FC } from 'react'

// 新增编辑的modal

interface Props extends ModalProps {
  children: ReactElement
}

const ActionModal: FC<Props> = ({ children, ...props }) => {
  return (
    <Modal destroyOnClose maskClosable={false} okText='确认' cancelText='取消' {...props}>
      {children}
    </Modal>
  )
}

export default ActionModal
