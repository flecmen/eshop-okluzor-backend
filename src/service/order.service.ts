import { PrismaClient, Order, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    //GET
    async getOrder(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput) {
        return prisma.order.findUnique({
            where: orderWhereUniqueInput,
            include: {
                order_items: true,
            }
        })
    },

    async getOrders(orderWhereInput: Prisma.OrderWhereInput) {
        return prisma.order.findMany({
            where: orderWhereInput,
            include: {
                order_items: true,
            }
        })
    },

    //PUT
    async createOrder(orderCreateInput: Prisma.OrderCreateInput) {
        return prisma.order.create({
            data: orderCreateInput,
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