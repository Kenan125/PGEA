
import { gettext } from "../helpers/gettext";
import { listUsedcolumns } from "../helpers/listusedcolumns";

export function useMessageInput(formik: any, usedColumns: string[], colNum: number[]) {
  
  // Core logic as a reusable callback
  const handleMessageInput =  async (formikField: string, columnLetter: string) => {
      formik.setFieldValue(formikField, columnLetter);
  
      const index = usedColumns.findIndex((col) => col === columnLetter);
      const absoluteColNum = colNum[index];
      const list = await listUsedcolumns();
      const values = await gettext(absoluteColNum - list.startCol);
  
      const current = formik.values.recipients || [];
      const maxLen = Math.max(current.length, values.length);
      const recipients: any[] = [];
  
      for (let i = 0; i < maxLen; i++) {
        const existing = current[i] || {};
        const val = values[i] || "";
        recipients.push({
          ...existing,
          [`Column_${columnLetter}`]: val, // store dynamically
        });
      }
  
      formik.setFieldValue("recipients", recipients);
    };

  

  return { handleMessageInput };
}
