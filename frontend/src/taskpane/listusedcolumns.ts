/* global Excel */

import { convertToColumnLetter } from "./convertToColumnLetter";
import { listNumUsedColumns } from "./listnumusedColumns";

export async function listUsedcolumns(): Promise<{columnLetters:string[],columnInfo:number[]}> {
  try {
    return await Excel.run(async (context) => {
      const columnInfo = await listNumUsedColumns()
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const usedRange = sheet.getUsedRange();
      usedRange.load("columnCount, columnIndex, values,text,valueTypes");
      await context.sync();     
      const columnLetters: string[] = [];
      for (let i = 0; i < columnInfo.length; i++) {
        if (usedRange.values[0][i] !== "") {
          console.log(i);
          const letter = await convertToColumnLetter(i);
          columnLetters.push(letter);
        }
      }      
      console.log("Used Columns:", columnLetters);
       
      return {
        columnLetters,
        columnInfo

      };
    });
  } catch (error) {
    console.log("Error: " + error);
    return error;
  }
}

