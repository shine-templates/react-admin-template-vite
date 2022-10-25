import React from 'react'
import { message, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload/interface'

type DynamicUpload = {
  fileLists: Array<Array<any>>
  normFile: (arg: any) => boolean
  setFileLists: (arg: Array<Array<any>>) => void
  beforeUpload: (file: RcFile) => boolean | string
  handleChange: ({ fileList }: any, index: number) => void
  addHandler: (add: () => void) => void
  removeHandler: (remove: (fieldName: number) => void, fieldName: number, index: number) => void
}

const useDynamicUpload = (initData: Array<Array<any>>): DynamicUpload => {
  const [fileLists, setFileLists] = React.useState<Array<Array<any>>>(initData ?? [[]])

  const handleChange = ({ fileList }: any, index: number): void => {
    fileLists[index] = [...fileList]
    let array = [...fileLists]
    setFileLists(array)
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const beforeUpload = (file: RcFile): boolean | string => {
    const isLt10M = file.size / 1024 / 1024 < 10
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg'
    const nameLength = file.name.length

    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件')
      return Upload.LIST_IGNORE
    }

    if (!isLt10M) {
      message.error('图片需小于10MB!')
      return Upload.LIST_IGNORE
    }

    if (nameLength > 50) {
      message.error('图片名称需要小于50字符')
      return Upload.LIST_IGNORE
    }

    return true
  }

  const addHandler = (add: () => void): void => {
    add()
    setFileLists([...fileLists, []])
  }

  const removeHandler = (remove: (fieldName: number) => void, fieldName: number, index: number): void => {
    remove(fieldName)
    fileLists.splice(index, 1)
    setFileLists([...fileLists])
  }

  return {
    fileLists,
    normFile,
    setFileLists,
    beforeUpload,
    handleChange,
    addHandler,
    removeHandler,
  }
}

export default useDynamicUpload
