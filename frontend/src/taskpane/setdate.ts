/* global Excel console */

import { format } from "date-fns";

export async function setDate() {
  try {
    await Excel.run(async (context) => {
      const currentDate: Date = new Date();
      const formattedDate: string = format(currentDate, "dd/MM/yyyy");
      console.log(formattedDate);
      const sheet = context.workbook.getSelectedRange();
      const range = sheet;
      let date = new Date(Date.now());
      let text = formattedDate;
      range.values = [[text]];
      range.format.autofitColumns();
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
