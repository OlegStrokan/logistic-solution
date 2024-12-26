import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ProductStatus } from 'src/product/core/product/entity/product-status';
import { BaseEntity } from 'src/shared/database/base.entity';

@Entity('products')
export class ProductDb extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.Available,
  })
  status: ProductStatus;

  @Column({ type: 'jsonb' })
  price: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  discontinuedAt: Date | null;
}