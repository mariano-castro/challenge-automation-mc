import fs from 'fs';
import path from 'path';

// Crear una carpeta si no existe
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Validar si un archivo es una imagen
export function isImageFile(filePath: string): boolean {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
  const ext = path.extname(filePath).toLowerCase();
  return validExtensions.includes(ext);
}

// Obtener el tamaño de un archivo
export function getFileSize(filePath: string): number {
  const stats = fs.statSync(filePath);
  return stats.size;
}
