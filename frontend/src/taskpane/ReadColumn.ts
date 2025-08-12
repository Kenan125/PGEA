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
            

            return text;
        });
        
    } catch (error) {
        console.log("error: " +error);
        return [""]
    }
    
}