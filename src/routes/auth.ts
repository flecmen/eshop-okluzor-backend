import express from 'express';
import authService from '../service/auth.service'
import userService from '../service/user.service';
import { User } from '@prisma/client';
import Logger from '../lib/logger';

const router = express.Router();

//POST
router.post('/login', async (req, res) => {
    // 1. verify input data, throw 400 if something is missing
    console.log('jsme v loginu')
    if (
        req.body.email == undefined || req.body.email === '' ||
        req.body.password == undefined || req.body.password === ''
    ) {
        res.status(400).json('Something is missing');
        return;
    }

    // 2. compare the password to the hash stored in the database, throw 401 or 403 if credentials incorrect
    const hashed_pw: String = authService.hashPassword(req.body.password)
    const user: User | null = await userService.user({ email: req.body.email });
    Logger.debug('hashed pw: ' + hashed_pw)
    // kontrola existence uživatele
    if (!user) {
        res.status(400).json('Invalid username');
        return;
    }

    //kontrola hesla
    if (hashed_pw !== user.password) {
        res.status(401).json('invalid credentials')
        return;
    }

    //úspěšné přihlášení
    const response = {
        token: authService.generateToken(user),
        user: user
    };
    res.status(201).json(response)
})

export default router;