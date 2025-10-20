import {CategoryInterface} from '../interfaces';

export function transformCategories(categories: CategoryInterface[] | null | undefined): CategoryInterface[] {
  if (!categories) return [];

  const categoriesList = new Map<string, CategoryInterface & { childs?: CategoryInterface[] }>();
  categories.forEach((cat) => {
    categoriesList.set(cat.id, { ...cat, childs: [] });
  });

  const childs: CategoryInterface[] = [];

  categoriesList.forEach((cat) => {
    if (cat.parentId && cat.parentId !== '00000000-0000-0000-0000-000000000000') {
      const parent = categoriesList.get(cat.parentId);
      if (parent) {
        parent.childs!.push(cat);
      }
    } else {
      childs.push(cat);
    }
  });

  return childs;
}
