import { Category } from '../entity/category';

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');
export const CATEGORY_MAPPER = Symbol('CATEGORY_MAPPER');

export interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findAll(page: number, limit: number): Promise<Category[]>;
  update(category: Category): Promise<Category>;
  deleteById(id: string): Promise<void>;
  clear(): Promise<void>;
}
