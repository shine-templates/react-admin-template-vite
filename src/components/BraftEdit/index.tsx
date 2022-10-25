import { FC, memo, useState } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { Upload, Button, message } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { EditorState, ControlType, ExtendControlType } from 'braft-editor/index'
import { UploadProps } from 'antd/lib/upload'
import request from 'utils/request'
import { useDebounceFn } from 'ahooks'

type P = {
  onChange?: (html: string) => void
  value?: string
}

const controls: ControlType[] = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']

const BraftEdit: FC<P> = memo(({ onChange = () => {}, value }): JSX.Element => {
  const [content, setContent] = useState<EditorState>(BraftEditor.createEditorState(value))
  const { run } = useDebounceFn(
    (html) => {
      onChange(html)
    },
    { wait: 500 },
  )

  const handleChange = (editorState: EditorState) => {
    const html = editorState.toHTML() === '<p></p>' ? '' : editorState.toHTML()
    setContent(editorState)
    run(html)
  }

  const uploadFileInterface = (data: FormData) => {
    return request({
      url: '/file/uploadFile',
      method: 'POST',
      data,
      timeout: 0,
      prefix: '/baimi',
    })
  }

  const uploadHandler = (options: { file: string | Blob }) => {
    if (!options.file) {
      return false
    }

    const uploadFile = new FormData()
    uploadFile.append('file', options.file)

    uploadFileInterface(uploadFile)
      .then((res) => {
        if (res?.data) {
          setContent(
            ContentUtils.insertMedias(content, [
              {
                type: 'IMAGE',
                url: res.data,
              },
            ]),
          )
        }
      })
      .catch((err) => {
        message.error('图片上传失败')
      })
  }

  const extendControls: ExtendControlType[] = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload<UploadProps> multiple={false} accept='image/*' showUploadList={false} customRequest={uploadHandler}>
          <Button className='control-item button upload-button' icon={<PictureOutlined />}>
            插入图片
          </Button>
        </Upload>
      ),
    },
  ]

  return (
    <div className='editor-wrapper' style={{ border: '1px solid #f0f0f0', height: '100%', background: '#fff' }}>
      <BraftEditor value={content} onChange={handleChange} controls={controls} extendControls={extendControls} />
    </div>
  )
})

export default BraftEdit
