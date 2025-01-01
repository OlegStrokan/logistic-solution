import { CategoryData, Category } from '../category';
import { CreateCategoryDto } from 'src/catalog/interface/dtos/create-category.dto';

export interface ICategoryMockService {
  getOneToCreate(overrides?: Partial<CategoryData>): CreateCategoryDto;
  getOneToCreateWithoutParentId(
    overrides?: Partial<Omit<CategoryData, 'parentCategoryId'>>,
  ): CreateCategoryDto;
  getOne(overrides?: Partial<CategoryData>): Category;
  createOne(overrides?: Partial<CategoryData>): Promise<Category>;
}
