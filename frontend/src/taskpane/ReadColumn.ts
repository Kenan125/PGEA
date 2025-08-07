/* global Excel  */
export async function readColumn(chsRow:number, chs:string): Promise<string> {
    try {
        return await Excel.run(async (context) =>{
            const selectedRange = context.workbook.worksheets.getActiveWorksheet().getUsedRange();         
            selectedRange.load(["text"]);
            await context.sync();
            const values = selectedRange.text;
            const text = JSON.stringify(values.map(row => ({[chs]:String(row[chsRow])}) ),null,1);
            console.log(text);


            return text;
        });
        
    } catch (error) {
        console.log("error: " +error);
        return ""
    }
    
}