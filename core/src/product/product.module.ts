import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDb } from './infrastructure/entity/product.entity';
import { ProductRepository } from './infrastructure/repository/product.repository';
import { CreateProductUseCase } from './epplication/use-cases/create-product.use-case';
import { ProductsController } from './interface/product.controller';
import { FindProductsUseCase } from './epplication/use-cases/find-products.use-case';
import { MarkAsAvailableUseCase } from './epplication/use-cases/mark-as-available.use-case';
import { MarkAsOutOfStockUseCase } from './epplication/use-cases/mark-as-out-of-stock.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDb])],
  providers: [
    CreateProductUseCase,
    FindProductsUseCase,
    MarkAsOutOfStockUseCase,
    MarkAsAvailableUseCase,
    ProductRepository,
  ],
  exports: [],
  controllers: [ProductsController],
})
export class ProductModule {}
