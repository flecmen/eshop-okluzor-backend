import express from "express";
import Logger from "../lib/logger";
import _ from "lodash";
import orderController from '../controllers/order-controller'


const router = express.Router();

//GET by status
router.get('/status/:status', orderController.getNewOrders)
//Get order by Id
router.get('/:orderId', orderController.getOrderById)
router.delete('/:orderId', orderController.deleteOrder)
router.put('/', orderController.createOrder)


export default router;