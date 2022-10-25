import { UploadFile } from 'antd/lib/upload/interface'
import configs from 'configs'
import dayjs from 'dayjs'

export const storage = (value: any, isPersistent: boolean = false) => {
  if (isPersistent) {
    for (const key in value) {
      localStorage.setItem(configs.SESSION_KEY + key, value[key])
    }
  } else {
    for (const key in value) {
      sessionStorage.setItem(configs.SESSION_KEY + key, value[key])
    }
  }
}

export const formatTime = (data: Array<Date>, keys: string[], format: string = 'YYYY-MM-DD HH:mm:ss') => {
  if (!data) return
  if (data.length > 0) {
    const [key_1, key_2] = keys
    return {
      [key_1]: dayjs(data[0]).format(format),
      [key_2]: dayjs(data[1]).format(format),
    }
  }
}

export const transTree = <T>(jsonData: Array<T>) => {
  let result: Array<T> = []
  let temp: any = {}
  let len = jsonData.length

  for (let i = 0; i < len; i++) {
    // @ts-ignore
    temp[jsonData[i]['privilegeId']] = jsonData[i]
  }

  for (let j = 0; j < len; j++) {
    let currentElement: any = jsonData[j]
    let tempCurrentElementParent = temp[currentElement['parentId']]
    if (tempCurrentElementParent) {
      if (!tempCurrentElementParent['children']) {
        tempCurrentElementParent['children'] = []
      }
      tempCurrentElementParent['children'].push(currentElement)
    } else {
      result.push(currentElement)
    }
  }

  return result
}

// @ts-ignore
export const nest = (items: any[], privilegeId = null, link = 'parentId') =>
  items
    .filter((item) => item[link] === privilegeId)
    // @ts-ignore
    .map((item) => ({ ...item, children: nest(items, item.privilegeId) }))

type CustomUploadFile = UploadFile & {}

export const resolveUploads = <T = any>(
  sources: Array<CustomUploadFile>,
  customFn?: (arg: CustomUploadFile) => T,
): T => {
  return sources.map((item) => {
    if (item.response) {
      if (customFn) {
        return customFn(item.response.data)
      }
      return item.response.data
    } else {
      return item.url
    }
  })[0]
}
export const transformPca = (source: { [key: string]: string } | string[]) => {
  if (Array.isArray(source)) {
    const [provinceId, cityId, areaId] = source
    return { provinceId, cityId, areaId }
  }
  const { provinceId, cityId, areaId } = source
  return [provinceId, cityId, areaId]
}
