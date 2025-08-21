import { listUsedcolumns } from "./listusedcolumns";

export async function registerEventHandler(setUsedColumns: (cols: string[]) => void,
  setColNum: (nums: number[]) => void) {
  const l = await listUsedcolumns();
  setUsedColumns(l.columnLetters || []);
  setColNum(l.columnNum || []);

  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();

    
    sheet.onChanged.add(async () => {
      const l = await listUsedcolumns();
      setUsedColumns(l.columnLetters || []);
  setColNum(l.columnNum || []);
    });
  });
    
}
