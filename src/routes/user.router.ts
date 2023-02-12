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
router.put('/:userId/branch', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        let branch = req.body
        branch.address = { create: branch.address }
        branch.user = { connect: { id: userId } }
        await branchService.createBranch(branch);
        res.json(branch);
    } catch (err) {
        res.status(406).send('Chyba obsahu (/userId/branch) ' + err)
    }
})

//edit branch
router.put('/:userId/branch/:branchId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const branchId = parseInt(req.params.branchId);
    try {
        let branch = req.body
        await userService.updateBranch(branchId, branch);
        res.json(branch);
    } catch (err) {
        res.status(406).send('Chyba obsahu (/userId/branch) ' + err)
    }
})

//Delete
//Delete user
router.delete('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    await userService.deleteUser({ id: userId });
    res.status(204).send('no content');
})

//Delete branch
router.delete('/:userId/branch/:branchId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const branchId = parseInt(req.params.branchId);
    //const user = await userService.user({ id: userId });
    await userService.deleteBranch({ id: branchId })
    res.status(204).send('no content');
})

export default router;