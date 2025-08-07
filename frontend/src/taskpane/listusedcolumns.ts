/* global Excel */

export async function listUsedcolumns(): Promise<string[]> {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const usedRange = sheet.getUsedRange();
      usedRange.load("columnCount, columnIndex, values,text,valueTypes");

      await context.sync();

      const startCol = usedRange.columnIndex;
      const colCount = usedRange.columnCount;

      const columnLetters: string[] = [];
      for (let i = startCol; i < startCol + colCount; i++) {
        if (usedRange.values[0][i] !== "") {
          console.log(i);
          columnLetters.push(convertToColumnLetter(i));
        }
      }      
      console.log("Used Columns:", columnLetters);
      return columnLetters;
    });
  } catch (error) {
    console.log("Error: " + error);
    return error;
  }
}
function convertToColumnLetter(index: number): string {
  let letter = "";
  index++;
  while (index > 0) {
    let mod = (index - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    index = Math.floor((index - mod) / 26);
  }
  return letter;
}
