import { test } from '../fixtures/secretFixture';
import { expect, APIRequestContext } from '@playwright/test';

test.describe('Pruebas API Posts', () => {
    let apiContext: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Validar POST request', async ({ encryptedKey }) => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const postData = { title: 'foo', body: 'bar', userId: 1 };
    const response = await apiContext.post(url, { data: postData });
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data.title).toBe(postData.title);
    expect(data.body).toBe(postData.body);
    expect(data.userId).toBe(postData.userId);
    console.log('Test finalizado:', new Date().toISOString());
  });
});
