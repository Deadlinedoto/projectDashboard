import {CategoryDTOInterface, CategoryInterface} from '../interfaces';


export const CategoryDTOAdapter = (data: CategoryDTOInterface): CategoryInterface => {
  return {
    id: data.id,
    name: data.name,
    parentName: data.parentName,
    childs: data.childs,
  }
}
