import { test as baseTest } from '@playwright/test';
import crypto from 'crypto';

// Clave secreta (no visible en el código final)
const SECRET_KEY = process.env.SECRET_KEY || '';

// Encripta la clave secreta con SHA256
function encryptSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

// Define la fixture para loguear la clave encriptada antes de cada test
export const test = baseTest.extend<{ encryptedKey: string }>({
  encryptedKey: async ({}, use) => {
    const encrypted = encryptSecret(SECRET_KEY);
    console.log('Clave encriptada:', encrypted);
    await use(encrypted);
  },
});
