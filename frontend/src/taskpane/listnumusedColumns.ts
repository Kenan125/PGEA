export async function listNumUsedColumns(): Promise<{startCol:number,
        colCount:number,
        columnnum:number[]}> {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();   
      const usedRange = sheet.getUsedRange();    
      await context.sync();
      usedRange.load("columnCount, columnIndex,values");
      await context.sync();
      const startCol = usedRange.columnIndex;
      const colCount = usedRange.columnCount;    
      const columnnum: number[] = [];
      const columnInfo = {
        startCol,
        colCount,
        columnnum
      };
      for (let i = 0; i < columnInfo.startCol + columnInfo.colCount; i++) {
        if (usedRange.values[0][i] !== "") {
          console.log(i);
          columnInfo.columnnum.push(i+startCol);
        }
      }
      
      console.log("used col num" +columnInfo.columnnum);
      console.log(columnInfo.startCol, columnInfo.colCount);
      return columnInfo;
    });
  } catch (error) {
    console.log("Error: " + error);
    return error;
  }
}