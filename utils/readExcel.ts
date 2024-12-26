import * as xlsx from 'xlsx';

export function readExcel(filePath: string): { id: string; name: string }[] {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

  return rows.slice(1).map(row => ({
    id: row[0] || '',
    name: row[1] || '',
  }));
}
