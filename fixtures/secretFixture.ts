import { test as baseTest } from '@playwright/test';
import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY no está definida en las variables de entorno');
}

export const test = baseTest.extend<{
  encryptedKey: string;
}>({
  encryptedKey: async ({}, use) => {
    const hash = crypto.createHash('sha256').update(secretKey).digest('hex');
    console.log('Clave secreta encriptada:', hash);

    await use(hash);
  },
});
