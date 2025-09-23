export interface CurrentCategoryInterface {
  id: string,
  name: string,
  parentId: string,
  childs: [
    {
      parentId: string,
    id: string,
    name: string,
    }
  ]
}
