export interface CategoryInterface {
  id: string,
  parentName: string,
  name: string,
  childs?: CategoryInterface[],
}
