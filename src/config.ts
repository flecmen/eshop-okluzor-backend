import { Secret } from 'jsonwebtoken';
import { Params } from 'express-jwt';
const dotenv = require('dotenv');
dotenv.config()

class MissingEnvironmentVariable extends Error { }

function requireEnv(varName: string): string | undefined {
    if (!(varName in process.env)) {
        throw new MissingEnvironmentVariable(`Missing required environment variable: ${varName}`);
    }

    return process.env[varName];
}

function defaultEnv(varName: string, defaultValue: any): any {
    try {
        return requireEnv(varName);
    } catch (e) {
        // Making sure other unexpected errors are not silenced
        if (e instanceof MissingEnvironmentVariable) {
            return defaultValue;
        }
        throw e;
    }
}

// This is later used in prisma, let's error early
const db_url = process.env.DATABASE_URL
const PORT = requireEnv('PORT');

const FRONT_ROOT_URL = defaultEnv('FRONT_ROOT_URL', 'http://localhost:9000');
const API_ROOT_URL = defaultEnv('API_ROOT_URL', `http://localhost:${PORT}`);
const JWT_SECRET = requireEnv('JWT_SECRET');
const JWT_SALT = requireEnv('JWT_SALT');

export default {
    PORT,
    FRONT_ROOT_URL,
    API_ROOT_URL,
    jwtConfig: {
        secret: JWT_SECRET as Params['secret'],
        algorithms: ['HS256'] as Params['algorithms']
    },
    passwordConfig: {
        salt: JWT_SALT,
        iterations: 1000,
        keylen: 64,
        digest: 'sha512',
    },
};
