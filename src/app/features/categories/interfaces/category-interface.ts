export interface CategoryInterface {
  id: string,
  parentId: string,
  name: string,
  childs?: CategoryInterface[],
}
