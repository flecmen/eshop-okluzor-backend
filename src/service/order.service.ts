import { PrismaClient, Order, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    //GET
    async order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput): Promise<Order | null> {
        return prisma.order.findUnique({
            where: orderWhereUniqueInput,
            include: {
                order_items: true,
            }
        })
    },

    async orders(orderWhereInput: Prisma.OrderWhereInput): Promise<Order[] | null> {
        return prisma.order.findMany({
            where: orderWhereInput,
            include: {
                order_items: true,
            }
        })
    },

    //SET
    async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
        return prisma.order.create({
            data,
        });
    },

    async updateOrder(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput, orderUpdateInput: Prisma.OrderUpdateInput) {
        return prisma.order.update({
            where: orderWhereUniqueInput,
            data: orderUpdateInput,
        })
    },

    //DELETE
    async deleteOrder(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput): Promise<void> {
        prisma.order.delete({
            where: orderWhereUniqueInput,
        })
        return
    }
}