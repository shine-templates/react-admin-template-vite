declare namespace Basic {
  type P = {
    name: string
    parentId: string
    privilegeId: string
    type: number
    url: string
  }
  type LoginRes = {
    name: string
    parentId: string
    privilegeId: Array<P>
    type: number
    url: string
  }
}

export default Basic
