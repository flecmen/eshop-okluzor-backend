import express from "express";
import userSerivice from "../service/user.service"
import { User, Branch } from "@prisma/client";
import userService from "../service/user.service";
import branchService from "../service/branch.service";
import authService from "../service/auth.service";


const router = express.Router();

//Get all users
router.get('/', async (req, res) => {
    const users = await userSerivice.allUsers();
    res.json(users)
})


//Get user by Id
router.get('/:userId', async (req, res) => {
    const userId: User["id"] = parseInt(req.params.userId);
    const user = await userService.user({ id: userId });
    res.json(user)
})

//get branches by user Id
router.get('/:userId/branch', async (req, res) => {
    const userId: User["id"] = parseInt(req.params.userId);
    const branches = await branchService.branches({ userId: userId });
    res.json(branches)
})

//POST
router.post('/login', async (req, res) => {
    // 1. verify input data, throw 400 if something is missing
    if (
        req.body.email == undefined || req.body.email === '' ||
        req.body.password == undefined || req.body.password === ''
    ) {
        res.status(400).json('Something is missing');
        return;
    }

    // 2. compare the password to the hash stored in the database, throw 401 or 403 if credentials incorrect
    const hashed_pw: String = authService.hashPassword(req.body.password)
    console.log(hashed_pw)
    const user: User | null = await userSerivice.user({ email: req.body.email });

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
        token: authService.generateToken(user)
    };
    res.status(201).json(response)
})

//PUT
//Create user
router.put('/', async (req, res) => {
    try {
        let user = req.body
        user.address = { create: user.address }
        await userSerivice.createUser(user);
        res.json(user)
    } catch (err) {
        res.status(406).send('Chyba obsahu ' + err)
    }
})

//edit user
router.put('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        let user = req.body
        await userSerivice.updateUser(userId, user)
        res.json(user)
    } catch (err) {
        res.status(406).send('Chyba obsahu ' + err)
    }
})

//Create branch
router.put('/:userId/createBranch', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        let branch = req.body
        branch.address = { create: branch.address }
        branch.user = { connect: { id: userId } }
        await branchService.createBranch(branch);
        res.json(branch);
    } catch (err) {
        res.status(406).send('Chyba obsahu (/userId/createBranch) ' + err)
    }
})

//Delete
router.delete('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    await userService.deleteUser({ id: userId });
    res.status(204).send('no content');
})

export default router;