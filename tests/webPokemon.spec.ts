import { test } from '../fixtures/secretFixture';
import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

const imagesDir = path.resolve(__dirname, '../images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const excelPath = path.resolve(__dirname, '../Datos-pruebas.xlsx');
const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const testData = xlsx.utils.sheet_to_json(sheet);

test.describe('Pruebas Web de Pokemon', () => {
  testData.forEach(({ name }: any) => { 
    test(`Validar Wikipedia para Pokémon: ${name}`, async ({ page, encryptedKey }) => {
      const url = `https://en.wikipedia.org/wiki/${name}`;
      console.log('Accediendo a:', url);
      await page.goto(url);
      const pageTitle = await page.title();
      expect(pageTitle.toLowerCase()).toContain(name.toLowerCase());
      const imageLocator = page.locator('img');
      const imageUrl = await imageLocator.first().getAttribute('src');
      expect(imageUrl).toBeTruthy();
      const absoluteImageUrl = imageUrl?.startsWith('http')
        ? imageUrl
        : new URL(imageUrl!, url).toString();
      const imageResponse = await page.request.get(absoluteImageUrl);
      const imagePath = path.resolve(imagesDir, `${name}.png`);
      fs.writeFileSync(imagePath, await imageResponse.body());
      expect(isImageFile(imagePath)).toBe(true);
      const fileSize = getFileSize(imagePath);
      console.log(`Tamaño del archivo descargado: ${fileSize} bytes`);
      expect(fileSize).toBeLessThan(500000);
    });
  });
});

function isImageFile(filePath: string): boolean {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
  const ext = path.extname(filePath).toLowerCase();
  return validExtensions.includes(ext);
}

function getFileSize(filePath: string): number {
  return fs.statSync(filePath).size;
}
