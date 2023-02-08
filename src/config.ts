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

const PORT = 3000;
const FRONT_ROOT_URL = defaultEnv('FRONT_ROOT_URL', 'http://localhost:3001');
const API_ROOT_URL = defaultEnv('API_ROOT_URL', `http://localhost:${PORT}`);
const JWT_SECRET = requireEnv('JWT_SECRET');
const JWT_SALT = requireEnv('JWT_SALT');

export default {
    PORT,
    FRONT_ROOT_URL,
    API_ROOT_URL,
    jwtConfig: {
        secret: JWT_SECRET,
        algorithms: ['HS256']
    },
    passwordConfig: {
        salt: JWT_SALT,
        iterations: 1000,
        keylen: 64,
        digest: 'sha512',
    },
};
