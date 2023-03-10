import express from 'express';

import cors from 'cors';
import config from './config'
import homepageRouter from './routes/homepage';
import authRouter from './routes/auth';
import userRouter from './routes/user.router';
import orderRouter from './routes/order.router'
import branchRouter from './routes/branch.router';
import productRouter from './routes/product.router'
import Logger from "./lib/logger";
import morganMiddleware from './config/morganMiddleware'
import { expressjwt } from "express-jwt";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Security
app.use(cors({ origin: config.FRONT_ROOT_URL }));

//Middleware
app.use(morganMiddleware) // logger

// secured urls
app.use('/user', expressjwt(config.jwtConfig));
app.use('/branch', expressjwt(config.jwtConfig));
app.use('/order', expressjwt(config.jwtConfig));
app.use('/product', expressjwt(config.jwtConfig));


app.use('/', homepageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/branch', branchRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);



const port = config.PORT;

app.listen(port, () => {
    Logger.debug(`Server listening on port ${port}, accepting requests from ${config.FRONT_ROOT_URL}`);

}); 