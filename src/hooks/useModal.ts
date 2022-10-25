import { useState } from 'react'

interface ModalHook {
  modalTitleName: string
  setModalTitleName: any
  modalvisible: boolean
  setModalVisible: any
}

const useModal = (suffix: string = ''): ModalHook => {
  const [modalTitleName, setModalTitleName] = useState<string>(`新增${suffix}`)
  const [modalvisible, setModalVisible] = useState<boolean>(false)

  return {
    modalTitleName,
    modalvisible,
    setModalTitleName,
    setModalVisible,
  }
}

export default useModal
