import { Product } from 'src/product/core/product/entity/product';
import { IUseCase } from 'src/shared/types/use-case.interface';

export type IFindProductsUseCase = IUseCase<void, Product[]>;
