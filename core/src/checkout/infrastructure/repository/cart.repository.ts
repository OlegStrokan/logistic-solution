import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDb } from '../entity/cart.entity';
import { Cart, CartData } from 'src/checkout/core/entity/cart/cart';
import { ICartMapper } from '../mappers/cart/cart.mapper.interface';
import { ICartRepository } from 'src/checkout/core/repository/cart.repository';
import { CART_MAPPER } from 'src/checkout/epplication/injection-tokens/mapper.token';
import { IClearableRepository } from 'src/shared/types/clearable';

@Injectable()
export class CartRepository implements ICartRepository, IClearableRepository {
  constructor(
    @InjectRepository(CartDb)
    private readonly cartRepository: Repository<CartDb>,
    @Inject(CART_MAPPER)
    private readonly mapper: ICartMapper<CartData, Cart, CartDb>,
  ) {}

  async saveCart(cart: Cart): Promise<Cart> {
    const dbCart = this.mapper.toDb(cart);
    await this.cartRepository.save(dbCart);
    const savedCart = await this.getOneByIdIdWithRelations(cart.id);
    if (!savedCart) {
      throw new Error('FIX IT');
    }
    return savedCart;
  }
  async updateCart(cart: Cart): Promise<Cart> {
    const dbCart = this.mapper.toDb(cart);
    const savedCart = await this.cartRepository.save(dbCart);
    return this.mapper.toDomain(savedCart);
  }
  async getCartByUserId(userId: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findOneBy({ userId });
    return cart ? this.mapper.toDomain(cart) : null;
  }

  async getOneByIdIdWithRelations(id: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    return cart ? this.mapper.toDomain(cart) : null;
  }

  async getCartById(id: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findOneBy({ id });
    return cart ? this.mapper.toDomain(cart) : null;
  }

  async clear(): Promise<void> {
    await this.cartRepository.query(`DELETE FROM "carts"`);
  }
}
