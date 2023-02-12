import { User } from '@prisma/client';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

export default {
    generateToken(user: User) {
        const tokenPayload = {
            userId: user.id,
            isAdmin: user.role === 'Admin' ?? false
        };
        return jwt.sign(
            tokenPayload as object,
            config.jwtConfig.secret as Secret,
            {
                algorithm: config.jwtConfig.algorithms[0],
            } as SignOptions,
        );
    },

    hashPassword(password: string) {
        return crypto.pbkdf2Sync(
            password,
            config.passwordConfig.salt as string,
            config.passwordConfig.iterations,
            config.passwordConfig.keylen,
            config.passwordConfig.digest
        ).toString(`hex`);
    },
    getDecodedTokenFromHeaders(req: Request): { userId: number, isAdmin: boolean, iat: string } | null {
        const { headers: { authorization } } = req;

        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token as string, config.jwtConfig.secret as jwt.Secret) as unknown

            return decoded as { userId: number, isAdmin: boolean, iat: string };
        }

        return null;
    },
    isAdmin(req: Request, res: Response, next: NextFunction) {
        const token = this.getDecodedTokenFromHeaders(req)
        if (!token) return res.status(401).send('Unauthorized');
        console.log(token)
        if (token.isAdmin) {
            return next();
        } else {
            return res.status(401).send('Unauthorized');
        }
    }
}