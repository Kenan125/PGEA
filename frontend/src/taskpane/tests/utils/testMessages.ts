import { format, formatISO, parse } from "date-fns";
import { parsePhoneNumberWithError } from "libphonenumber-js";
/* global Excel  */
export async function testMessage(
  chsRow: number,
  str: string,
  time?: string,
  
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
        text = values.map((row) => row[chsRow] ?? "");
        console.log(text + "texttttst");
        if (str === "phoneNumber") {
          console.log("time is null");
          for (let i = 0; i < text.length; i++) {
            if (!isNaN(text[i])) {
              if (parsePhoneNumberWithError(text[i], "TR").isPossible()) {
                extracted.push(parsePhoneNumberWithError(text[i], "TR").number);
              }
            } else {
              console.log("not numbaaa");
            }
          }
          console.log("PhoneNumbaaaaa: " + extracted);
        }
        if (str === "sendDate") {
          console.log("time is not null ");
          console.log(text[0]);

          for (let i = 0; i < text.length; i++) {
            const parsed = parse(String(text[i]), "dd/MM/yyyy", new Date());
            extracted.push(format(new Date(parsed), `yyyy-MM-dd'T'${time}.sss'Z'`));
          }
          console.log("dateLLL::: " + extracted);
        }
        
        
      }

      return extracted;
    });
  } catch (error) {
    console.log("error: " + error);
    return [""];
  }
}
