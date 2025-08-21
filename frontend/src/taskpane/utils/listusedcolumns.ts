import { convertToColumnLetter } from "./convertToColumnLetter";
import { listNumUsedColumns } from "./listnumusedColumns";

export async function listUsedcolumns(): Promise<{columnLetters:string[],columnNum:number[],startCol:number}> {
  try {    
    
      const columnInfo = await listNumUsedColumns()               
       
      const columnLetters: string[] = [];
      const columnNum =columnInfo.columnnum;
      const startCol = columnInfo.startCol;
      for (let i = 0; i < columnInfo.columnnum.length- columnInfo.startCol; i++) {
        console.log("lu: " + i)
        
          console.log(i);
          const letter = await convertToColumnLetter(columnInfo.columnnum[i]);
          columnLetters.push(letter);
        
      }      
      console.log("Used Columns:", columnLetters);
       
      return {
        columnLetters,
        columnNum,
        startCol

      };
  } catch (error) {
    console.log("Error: " + error);
    return error;
  }
}
