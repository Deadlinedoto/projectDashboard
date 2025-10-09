export interface CurrentCategoryInterface {
  childs: CurrentCategoryInterface[];
  id: string;
  name: string;
  parentId: string;
}
