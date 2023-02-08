import express from 'express';
import authService from '../service/auth.service'
import { hasOnlyExpressionInitializer } from 'typescript';

const app = express();

app.get('/login', async (req, res) => {
    if (
        req.body.username == undefined || req.body.username === '' ||
        req.body.password == undefined || req.body.password === ''
    ) {
        res.status(400).json('Something is missing');
        return;
    }

    const hashedpw = authService.hashPassword(req.body.password);
})

export default app;