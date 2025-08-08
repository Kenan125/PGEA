export async function listNumUsedColumns(): Promise<number[]> {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();   
      const usedRange = sheet.getUsedRange();    
      await context.sync();
      usedRange.load("columnCount, columnIndex,values");
      await context.sync();
      const startCol = usedRange.columnIndex;
      const colCount = usedRange.columnCount;
      const columnInfo = {
        startCol,
        colCount,
      };
      const columnnum: number[] = [];
      for (let i = startCol; i < startCol + colCount; i++) {
        if (usedRange.values[0][i] !== "") {
          console.log(i);
          columnnum.push(i);
        }
      }
      console.log("used col num" +columnnum);
      console.log(columnInfo.startCol, columnInfo.colCount);
      return columnnum;
    });
  } catch (error) {
    console.log("Error: " + error);
    return error;
  }
}
