/* global Excel  */
export async function gettext(
  chsRow: number,
  
  
  
): Promise<any[]> {
  try {
    return await Excel.run(async (context) => {
      const selectedRange = context.workbook.worksheets.getActiveWorksheet().getUsedRange();
      selectedRange.load(["text","columnIndex"],);
      await context.sync();
      
    
      const values = selectedRange.text || [];
      let text = [];
      let extracted = [];                       
      if (values !== null) {
        
        let btext = ["Alice", "John", "Mary"];
        let input = "Hello text[1], meet text[0] and text[2]";
        let output = input.replace(/text\[(\d+)\]/g, (match, index) => {
          index = parseInt(index, 10);
          return btext[index] ?? match;
        });
        extracted.push(output)
        text = values.map((row) => row[chsRow] ?? "");                  
                          
      }

      return text;
    });
  } catch (error) {
    console.log("error: " + error);
    return [""];
  }
}
