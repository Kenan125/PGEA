export async function highlightTest():Promise<boolean> {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.getSelectedRanges().getUsedRangeAreas();
      //const usedRange = sheet.getUsedRange();
      //const formulaRanges = usedRange.getSpecialCells(Excel.ce);
      sheet.format.fill.color = "red";
      await context.sync();
      return true;
    });
  } catch (error) {
    console.error("Error highlighting formulas:", error);
    return false;
  }
}