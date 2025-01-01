import { Clonable } from 'src/shared/types/clonable';
import { generateUlid } from 'src/shared/types/generate-ulid';
import { Money } from 'src/shared/types/money';
import { CartItemData } from 'src/checkout/domain/cart-item.entity';

export interface OrderData {
  id: string;
  userId: string;
  status: string;
  items: CartItemData[];
  totalPrice: Money;
  createdAt: Date;
  updatedAt: Date;
}

export class Order implements Clonable<Order> {
  constructor(public order: OrderData) {}

  static create = (
    orderData: Omit<OrderData, 'id' | 'createdAt' | 'updatedAt'>,
  ) =>
    new Order({
      ...orderData,
      id: generateUlid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  get id(): string {
    return this.order.id;
  }

  get userId(): string {
    return this.order.userId;
  }

  get status(): string {
    return this.order.status;
  }

  get items(): CartItemData[] {
    return this.order.items;
  }

  get totalPrice(): Money {
    return this.order.totalPrice;
  }

  markAsShipped = () => {
    const clone = this.clone();
    clone.order.status = 'Shipped';
    return clone;
  };

  markAsCancelled = () => {
    const clone = this.clone();
    clone.order.status = 'Cancelled';
    return clone;
  };

  clone = (): Order => new Order({ ...this.order });
}