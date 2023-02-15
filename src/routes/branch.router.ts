import express from "express";
import userSerivice from "../service/user.service"
import { User, Branch, Address } from "@prisma/client";
import userService from "../service/user.service";
import branchService from "../service/branch.service";
import authService from "../service/auth.service";
import addressService from "../service/address.service";
import config from "../config";
import * as jwt from 'jsonwebtoken';
import Logger from "../lib/logger";
import _ from "lodash";


const router = express.Router();

//Get branch by Id
router.get('/:branchId', async (req, res) => {
    const branchId: Branch["id"] = parseInt(req.params.branchId);
    const branch = await branchService.getBranch({ id: branchId });
    res.json(branch)
})

//edit branch
router.put('/:branchId', async (req, res) => {
    const branchId = parseInt(req.params.branchId);

    try {
        const branch = req.body;
        const returnBranch = _.clone(branch);
        const branchAddress: Address = branch.address;
        const dbBranch = await branchService.getBranch({ id: branchId });
        //změnilo se něco?
        if (!_.isEqual(branch, dbBranch)) {
            await branchService.updateBranch({ id: branchId }, branch as Branch);
            //změna adresy?
            if (!_.isEqual(branchAddress, dbBranch?.address)) await addressService.updateAddress({ id: branchAddress.id }, branchAddress)
        }

        res.json(returnBranch);
    } catch (err) {
        Logger.error(err)
        res.status(406).send('Chyba obsahu (PUT /branch/branchId) ' + err)
    }
})


//Delete branch
router.delete('/:branchId', authService.isAdmin.bind(authService), async (req, res) => {
    const branchId = parseInt(req.params.branchId);
    await branchService.deleteBranch({ id: branchId })
    res.status(204).send('no content');
})

export default router;