export interface CategoryDTOInterface {
  id: string,
  parentName: string,
  name: string,
  childs?: CategoryDTOInterface[],
}
