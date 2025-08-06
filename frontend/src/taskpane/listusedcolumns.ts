
/* global Excel */

export async function listUsedcolumns(): Promise<string[]> {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const usedRange = sheet.getUsedRange();
      usedRange.load("columnCount, columnIndex, values");

      await context.sync();

      const startCol = usedRange.columnIndex; // e.g., 0 for column A
      const colCount = usedRange.columnCount;

      const columnLetters: string[] = [];
      for (let i = startCol; i < startCol + colCount; i++) {
        if(usedRange.values){
        columnLetters.push(convertToColumnLetter(i));
          console.log(i);
        }
      }
      

      console.log("Used Columns:", columnLetters );
      return columnLetters;
    });
  } catch (error) {
    console.log("Error: " + error);
    return error;
  }
}
function convertToColumnLetter(index: number): string {
    let letter = '';
    index++; // make it 1-based
    while (index > 0) {
        let mod = (index - 1) % 26;
        letter = String.fromCharCode(65 + mod) + letter;
        index = Math.floor((index - mod) / 26);
    }
    return letter;
}