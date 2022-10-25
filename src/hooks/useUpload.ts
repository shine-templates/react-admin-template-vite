import React, { useEffect, useMemo, useState } from 'react'
import { message, Modal, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import getHeaders from 'utils/headers'

interface InitUploadData {
  initUrl?: FILEITEM.item[]
  maxCount?: number
  [propsName: string]: any
}

const resolveImgUrl = (file: UploadFile | FILEITEM.item) => {
  if (file.status === 'done') {
    return Array.isArray(file.response) ? file.response[0].fileUrl : file.response.data[0].fileUrl
  }
  return file.url
}

export default function useFormUpload(initData: InitUploadData) {
  const { initUrl = [], maxCount = 1 } = initData
  const [loading, setloading] = useState(false)
  const [showUploadIcon, setshowUploadIcon] = useState(true)
  const [deleteId, setDeleteId] = React.useState<string[]>([])
  const [finish, setFinish] = React.useState<boolean>(true)
  const [arr, setArr] = React.useState<string[]>([])

  const formInitValues = useMemo(() => {
    if (initUrl.length > 0) {
      return initUrl.map((item) => ({
        url: item.fileUrl || item.url || '' || item,
        fileId: item.fileId || '',
      }))
    } else {
      return []
    }
  }, [initUrl])

  useEffect(() => {
    if (initUrl.length === maxCount) {
      setshowUploadIcon(false)
    } else {
      setshowUploadIcon(true)
    }
    // 如果是个对象一定要注意
  }, [initUrl.length, maxCount])

  const onPreview = async (file: UploadFile | FILEITEM.item) => {
    console.log('file', file)

    Modal.info({
      content: React.createElement('img', {
        src: resolveImgUrl(file),
        style: {
          width: '300px',
          marginTop: '10px',
        },
      }),
      closable: true,
      maskClosable: true,
      title: null,
      icon: null,
      okButtonProps: {
        size: 'small',
        type: 'default',
      },
      okText: '关闭',
      style: {
        display: 'flex',
        justifyContent: 'center',
      },
    })
  }

  // 返回删除图片的id
  const resolveDeleteFileId = (file: any) => {
    if (file.status === 'removed' && file.response) {
      setDeleteId((oldArray) => {
        let middleValues = [...oldArray, file?.response.data[0].fileId || '']
        return middleValues
      })
      setArr((oldArray) => {
        oldArray.push(file?.response.data[0].fileId)
        return oldArray
      })
    } else {
      setDeleteId((oldArray) => {
        let middleValues = [...oldArray, file.fileId]
        return middleValues
      })
      setArr((oldArray) => {
        oldArray.push(file.fileId)
        return oldArray
      })
    }
  }

  // 清空删除的图片id
  const clearArr = () => {
    setArr([])
  }

  const onChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setFinish(false)
      setloading(true)
      return
    }
    if (info.file.status === 'done') {
      setFinish(true)
      if (info.fileList.length === maxCount) {
        setshowUploadIcon(false)
      }
    }
    if (info.file.status === 'removed') {
      resolveDeleteFileId(info.file)
      if (info.fileList.length < maxCount) {
        setshowUploadIcon(true)
      }
    }
    if (info.file.status === 'error') {
      info.fileList.pop()
      message.error('上传失败，请重新上传')
    }
    setloading(false)
  }

  return {
    props: {
      maxCount,
      onChange,
      headers: getHeaders(),
      onPreview,
    },
    loading,
    showUploadIcon,
    setloading,
    setshowUploadIcon,
    formInitValues,
    deleteId,
    finish,
    arr,
    clearArr,
  }
}

export function beforeUpload(file: RcFile) {
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

export function normFile(e: any) {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}
