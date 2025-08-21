/* global Excel  */

export async function insertSelectedArea(text:string): Promise<boolean> {
  
  try {
    await Excel.run(async (context) => {
      //const sheet = context.workbook.worksheets.getActiveWorksheet();
      const selectedRange = context.workbook.getSelectedRange();

      selectedRange.load(["address", "rowCount", "columnCount"]);
      await context.sync();

      
      const values = Array.from({ length: selectedRange.rowCount }, () =>
        Array(selectedRange.columnCount).fill(text)
      );

      selectedRange.values = values;
      selectedRange.format.autofitColumns();
      
      

      await context.sync();
      console.log(`Inserted text into: ${selectedRange.address}`);
      
    });
    return true;
  } catch (error) {
    console.log("Error: " + error);
    return false;
  }
}
