import { test } from '../fixtures/secretFixture';
import { expect, APIRequestContext } from '@playwright/test';
import { readExcel } from '../utils/readExcel';

const testData = readExcel('./Datos-pruebas.xlsx');

test.describe('Pruebas API Pokemon', () => {
    let apiContext: APIRequestContext;

  // Inicializa el contexto de solicitudes antes de los tests
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
  });

  // Cierra el contexto de solicitudes después de los tests
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  testData.forEach(({ id, name }) => {
    test(`Validar Pokemon con ID/Name: ${id || name}`, async ({ encryptedKey }) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id || name}`;
      const startTime = Date.now();

      // Realiza la solicitud HTTP
      const response = await apiContext.get(url);
      expect(response.status()).toBe(200);

      const data = await response.json();

      // Validaciones
      expect(data.id).toBeDefined();
      expect(data.name).toBeDefined();
      expect(data.abilities).toBeDefined();
      expect(Date.now() - startTime).toBeLessThan(10000);

      // Log fecha y hora
      console.log('Test finalizado:', new Date().toISOString());
    });
  });
});
