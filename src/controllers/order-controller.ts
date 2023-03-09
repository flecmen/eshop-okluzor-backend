import { Request, Response } from "express"
import { Order, Order_item, Order_status, Prisma } from "@prisma/client";
import orderService from "../service/order.service";


export default {
    getOrderById: async (req: Request, res: Response) => {
        const orderId: Order["id"] = parseInt(req.params.orderId);
        const order = await orderService.getOrder({ id: orderId });
        res.json(order)
    },
    getNewOrders: async (req: Request, res: Response) => {
        const status = req.params.status as Order['status']
        //kontrola správnosti statusu
        if (!Object.values(Order_status).includes(status)) {
            res.status(406).send('Neplatný status');
            return;
        }

        const orders = await orderService.getOrders({ status: 'objednano' });
        res.json(orders)
    },
    createOrder: async (req: Request, res: Response) => {
        const order = req.body;
        if (order.order_items === undefined) {
            res.status(400).send('V objednávce chybí zboží')
            return
        }
        order.order_items = { create: order.order_items }
        const o = await orderService.createOrder(order);

        res.json(await orderService.getOrder({ id: o.id }))
    },
    deleteOrder: async (req: Request, res: Response) => {
        const orderId: Order["id"] = parseInt(req.params.orderId);
        orderService.deleteOrder({ id: orderId })

        res.status(204);
    },
    updateOrder: async (req: Request, res: Response) => {
        const orderId: Order["id"] = parseInt(req.params.orderId);
        let order = req.body
        order.branch = { connect: order.branch }
        order.user = { connect: order.user }
        order.order_items = { connectOrCreate: order.order_items }

        let new_order = await orderService.updateOrder({ id: orderId }, order)
        res.status(202).json(await orderService.getOrder({ id: new_order.id }));
    },

}
