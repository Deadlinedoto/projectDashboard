export interface CurrentCategoryInterface {
  id: string,
  name: string,
  parentId: string,
  childs: [
    {
    id: string,
    parentId: string,
    name: string,
    }
  ]
}
