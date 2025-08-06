/* global Excel console */

import { format } from "date-fns";

export async function getDate(range: number, time: string): Promise<boolean> {
    try {
        await Excel.run(async (context) => {
            let sheet = context.workbook.worksheets.getActiveWorksheet();

            let usedRange = sheet.getUsedRangeOrNullObject();
            usedRange.load(["rowCount"]);
            await context.sync();
            if (usedRange.isNullObject) {
                console.log("No used range found.");
            } else {
                console.log(`Used range found with ${usedRange.rowCount} rows.`);
            }
            let rowCount = usedRange.rowCount;
            let rangeAreas = sheet.getRangeByIndexes(0, range, rowCount, 1);
            rangeAreas.load(["column", "text"]);
            await context.sync();

            const values = rangeAreas.text.map(row => ({ sendDate: (format(new Date(row[0]).toLocaleDateString(), `dd/MM/yyyy ${time}`)) }));
            const text = JSON.stringify(values, null, 1);    //2025-08-01T13:53:47.616Z 
            console.log(`Read text from: ${text}`);



            await context.sync();



        });
        return true;
    } catch (error) {
        console.log("Error: " + error);
        return false;
    }
}
