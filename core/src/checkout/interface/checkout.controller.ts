import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IAddToCartUseCase } from '../epplication/use-cases/add-to-cart/add-to-cart.interface';
import { ICancelOrderUseCase } from '../epplication/use-cases/cancel-order/cancel-order.interface';
import { ICheckPaymentStatusUseCase } from '../epplication/use-cases/check-payment-status/check-payment-status.interface';
import { IClearCartUseCase } from '../epplication/use-cases/clear-cart/clear-cart.interface';
import { ICreateOrderUseCase } from '../epplication/use-cases/create-order/create-order.interface';
import { IGetAllOrdersUseCase } from '../epplication/use-cases/get-all-orders/get-all-orders.interface';
import { IGetOrderDetailsUseCase } from '../epplication/use-cases/get-order-detail/get-order-detail.interface';
import { IProceedPaymentUseCase } from '../epplication/use-cases/process-payment/process-payment.interface';
import { IRetrieveCartUseCase } from '../epplication/use-cases/retrieve-cart/retrieve-cart.interface';
import { IShipOrderUseCase } from '../epplication/use-cases/ship-order/ship-order.interface';
import { ICreateCartUseCase } from '../epplication/use-cases/create-cart/create-cart.interface';
import {
  ADD_TO_CART_USE_CASE_TOKEN,
  CANCEL_ORDER_USE_CASE_TOKEN,
  CHECK_PAYMENT_STATUS_USE_CASE_TOKEN,
  CLEAR_CART_USE_CASE_TOKEN,
  CREATE_ORDER_USE_CASE_TOKEN,
  GET_ALL_ORDERS_USE_CASE_TOKEN,
  RETRIEVE_CART_USE_CASE_TOKEN,
  SHIP_ORDER_USE_CASE_TOKEN,
  CREATE_CART_USE_CASE_TOKEN,
  GET_ORDER_DETAILS_USE_CASE_TOKEN,
  PROCEED_PAYMENT_USE_CASE_TOKEN,
} from '../epplication/injection-tokens/use-case.token';

@Controller('checkout')
export class CheckoutController {
  constructor(
    @Inject(ADD_TO_CART_USE_CASE_TOKEN)
    private addToCartUseCase: IAddToCartUseCase,
    @Inject(RETRIEVE_CART_USE_CASE_TOKEN)
    private retrieveCartUseCase: IRetrieveCartUseCase,
    @Inject(CLEAR_CART_USE_CASE_TOKEN)
    private clearCartUseCase: IClearCartUseCase,
    @Inject(CREATE_ORDER_USE_CASE_TOKEN)
    private createOrderUseCase: ICreateOrderUseCase,
    @Inject(GET_ORDER_DETAILS_USE_CASE_TOKEN)
    private getOrderDetailsUseCase: IGetOrderDetailsUseCase,
    @Inject(GET_ALL_ORDERS_USE_CASE_TOKEN)
    private getAllOrdersUseCase: IGetAllOrdersUseCase,
    @Inject(CANCEL_ORDER_USE_CASE_TOKEN)
    private cancelOrderUseCase: ICancelOrderUseCase,
    @Inject(SHIP_ORDER_USE_CASE_TOKEN)
    private shipOrderUseCase: IShipOrderUseCase,
    @Inject(PROCEED_PAYMENT_USE_CASE_TOKEN)
    private proceedPaymentUseCase: IProceedPaymentUseCase,
    @Inject(CHECK_PAYMENT_STATUS_USE_CASE_TOKEN)
    private checkPaymentStatusUseCase: ICheckPaymentStatusUseCase,
    @Inject(CREATE_CART_USE_CASE_TOKEN)
    private createCartUseCase: ICreateCartUseCase,
  ) {}

  @Post('cart')
  addToCart(@Body() dto: any) {
    return this.addToCartUseCase.execute(dto);
  }

  @Post('cart/create')
  createCart(@Body() dto: any) {
    return this.createCartUseCase.execute(dto);
  }

  @Get('cart')
  getCart() {
    return this.retrieveCartUseCase.execute(null);
  }

  @Delete('cart')
  clearCart() {
    return this.clearCartUseCase.execute(null);
  }

  @Post('order')
  createOrder(@Body() dto: any) {
    return this.createOrderUseCase.execute(dto);
  }

  @Get('order/:id')
  getOrderDetails(@Param('id') id: string) {
    return this.getOrderDetailsUseCase.execute(id);
  }

  @Get('orders')
  getAllOrders() {
    return this.getAllOrdersUseCase.execute(null);
  }

  @Patch('order/:id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.cancelOrderUseCase.execute(id);
  }

  @Patch('order/:id/ship')
  shipOrder(@Param('id') id: string) {
    return this.shipOrderUseCase.execute(id);
  }

  @Post('payment')
  proceedPayment(@Body() dto: any) {
    return this.proceedPaymentUseCase.execute(dto);
  }

  @Get('payment/status/:id')
  checkPaymentStatus(@Param('id') id: string) {
    return this.checkPaymentStatusUseCase.execute(id);
  }
}
