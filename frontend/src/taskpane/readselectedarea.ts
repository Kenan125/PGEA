/* global Excel  */
export async function readSelectedArea(): Promise<string> {
  try {
    return await Excel.run(async (context) => {
      const selectedRange = context.workbook.getSelectedRange();
      selectedRange.load([ "text"]);
      await context.sync();

      const values = selectedRange.text;
      const text = JSON.stringify(values.map(row => ({phoneNumber:String(row[0])})), null, 1);
      
      
      console.log(`Read text from: ${text}`);
      return text;
    });
  } catch (error) {
    console.log("Error: " + error);
    return "";
  }
}