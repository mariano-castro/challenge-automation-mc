import fs from 'fs';
import path from 'path';

export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function isImageFile(filePath: string): boolean {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
  const ext = path.extname(filePath).toLowerCase();
  return validExtensions.includes(ext);
}

export function getFileSize(filePath: string): number {
  const stats = fs.statSync(filePath);
  return stats.size;
}
