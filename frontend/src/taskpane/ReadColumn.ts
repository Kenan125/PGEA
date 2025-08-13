import { parsePhoneNumberWithError } from "libphonenumber-js";
/* global Excel  */
export async function readColumn(chsRow:number): Promise<any[]> {
    try {
        return await Excel.run(async (context) =>{
            const selectedRange = context.workbook.worksheets.getActiveWorksheet().getUsedRange();         
            selectedRange.load(["text"]);
            await context.sync();
            const values = selectedRange.text || [];
            let text = []
            if(values !== null){
                  text = values.map((row) => row[chsRow]?? "");
            console.log(text);

            }
            const phoneNumber = parsePhoneNumberWithError(" 0 (800) 555-35-35 ", "TR");



      if (phoneNumber) {


        console.log(phoneNumber)


        phoneNumber.number === "+75313987280";


        console.log("country"+ phoneNumber.country)


        console.log(phoneNumber.isPossible());


        //phoneNumber.country === "TR";


        //phoneNumber.isPossible() === true;


        phoneNumber.isValid() === true;


        // Note: `.getType()` requires `/max` metadata: see below for an explanation.


        phoneNumber.getType() === "TOLL_FREE";


      }
            

            return text;
        });
        
    } catch (error) {
        console.log("error: " +error);
        return [""]
    }
    
}