import express from 'express';

import cors from 'cors';
import config from './config'
import homepageRouter from './routes/homepage';
import authRouter from './routes/auth';
import userRouter from './routes/user.router';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO: UPRAVIT CORS
app.use(cors({ origin: '*' }));

app.use('/', homepageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


const port = config.PORT;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});