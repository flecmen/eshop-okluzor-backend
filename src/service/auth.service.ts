import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';
import crypto from "crypto";
import { User } from '@prisma/client';

export default {
    generateToken(user: User) {
        const tokenPayload = {
            user: user,
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
    }
}