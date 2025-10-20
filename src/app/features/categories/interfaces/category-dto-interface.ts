export interface CategoryDTOInterface {
  id: string,
  parentId: string,
  name: string,
  childs?: CategoryDTOInterface[],
}
