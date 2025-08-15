import { useEffect, useCallback } from "react";

import { readColumn } from "../ReadColumn";
import { listUsedcolumns } from "../helpers/listusedcolumns";

export function useColumnSelect(formik: any, usedColumns: string[], colNum: number[]) {
  
  // Core logic as a reusable callback
  const handleColumnSelect = useCallback(
    async (formikField: string, columnLetter: string, targetField: "phoneNumber" | "sendDate", time?: string) => {
      formik.setFieldValue(formikField, columnLetter);

      const index = usedColumns.findIndex((col) => col === columnLetter);
      if (index < 0) return; // Safety check
      const absoluteColNum = colNum[index];

      try {
        const list = await listUsedcolumns();
        const values = await readColumn(absoluteColNum - list.startCol, targetField, time);

        const current = formik.values.recipients || [];
        const maxLen = Math.max(current.length, values.length);
        const recipients: any[] = [];

        for (let i = 0; i < maxLen; i++) {
          const existing = current[i] || { phoneNumber: "", sendDate: "" };
          const val = values[i] || "";

          if (targetField === "sendDate") {
            recipients.push({ ...existing, sendDate: val });
          } else if (targetField === "phoneNumber") {
            recipients.push({ ...existing, phoneNumber: val });
          }
        }

        formik.setFieldValue("recipients", recipients);
      } catch (err) {
        console.error("Failed to read column:", err);
        formik.setFieldError("recipients", "Failed to read selected column");
      }
    },
    [formik, usedColumns, colNum]
  );

  

  return { handleColumnSelect };
}
