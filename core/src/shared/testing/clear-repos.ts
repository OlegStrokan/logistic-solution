import { TestingModule } from '@nestjs/testing';
import { IProductRepository } from 'src/product/core/product/repository/product.repository';
import { ProductRepository } from 'src/product/infrastructure/repository/product.repository';
import { IClearableRepository } from '../types/clearable';
import { IUserRepository } from 'src/user/core/repository/user.repository';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';
import { ICategoryRepository } from 'src/catalog/core/category/repository/category.repository';
import { CategoryRepository } from 'src/catalog/infrastructure/repository/category.repository';

export const clearRepos = async (module: TestingModule) => {
  const repositories = [
    module.get<IProductRepository>(ProductRepository),
    module.get<IUserRepository>(UserRepository),
    module.get<ICategoryRepository>(CategoryRepository),
  ];

  for (const repository of repositories) {
    const retypedRepo = repository as unknown as IClearableRepository;
    if (retypedRepo.clear) {
      await retypedRepo.clear();
    }
  }
};