import { OrderItemCommandMapper } from 'src/order-item/infrastructure/mapper/order-item-command.mapper';
import { Order } from 'src/order/domain/order';
import { OrderDto } from 'src/order/interface/dto/order.dto';
import { ParcelCommandMapper } from 'src/parcel/infrastructure/mapper/parcel-command.mapper';
import { OrderStatusMapper } from 'src/repayment-preferences/infrastructure/mapper/order-status.mapper';
import { OrderCommand } from '../entity/order-command.entity';

export class OrderCommandMapper {
    static toDomain(orderCommand: OrderCommand): Order {
        const orderData = {
            id: orderCommand.id,
            customerId: orderCommand.customerId,
            totalAmount: orderCommand.totalAmount,
            createdAt: orderCommand.createdAt,
            updatedAt: orderCommand.updatedAt,
            status: OrderStatusMapper.fromDatabase(orderCommand.status),
            deliveryAddress: orderCommand.deliveryAddress,
            paymentMethod: orderCommand.paymentMethod,
            specialInstructions: orderCommand.specialInstructions,
            items: orderCommand.items.map((item) => OrderItemCommandMapper.toDomain(item)),
        };
        return Order.createWithId(orderData);
    }

    static toClient(order: Order): OrderDto {
        const items = order.items.map((item) => OrderItemCommandMapper.toClient(item));
        const parcels = order.parcels.map((parcel) => ParcelCommandMapper.toClient(parcel));
        return {
            id: order.id,
            customerId: order.customerId,
            items,
            status: OrderStatusMapper.fromDatabase(order.status),
            totalAmount: order.totalAmount,
            deliveryAddress: order.deliveryAddress,
            parcels,
        };
    }

    static toEntity(order: Order): OrderCommand {
        const orderCommand = new OrderCommand();
        orderCommand.id = order.id;
        orderCommand.customerId = order.customerId;
        orderCommand.totalAmount = order.totalAmount;
        orderCommand.createdAt = order.createdAt;
        orderCommand.updatedAt = order.updatedAt;
        orderCommand.status = order.status;
        orderCommand.deliveryAddress = order.deliveryAddress;
        orderCommand.paymentMethod = order.paymentMethod;
        orderCommand.specialInstructions = order.specialInstruction;
        // TODO add order.feedback
        orderCommand.items = order.items.map((item) => OrderItemCommandMapper.toEntity(item));
        return orderCommand;
    }
}
