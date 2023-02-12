import express from 'express';

import cors from 'cors';
import config from './config'
import homepageRouter from './routes/homepage';
import authRouter from './routes/auth';
import userRouter from './routes/user.router';
import { expressjwt } from "express-jwt";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: config.FRONT_ROOT_URL }));

// secured urls
app.use('/user', expressjwt(config.jwtConfig));


app.use('/', homepageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);



const port = config.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}, accepting requests from ${config.FRONT_ROOT_URL}`);

});