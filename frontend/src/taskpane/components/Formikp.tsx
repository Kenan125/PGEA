import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { sendSchema } from "../schemas/sendSchema";
import CustomInput from "../customFields/customInput";
import { send } from "../send";
import { Dropdown, DropdownProps, Option, useId } from "@fluentui/react-components";
import { listUsedcolumns } from "../listusedcolumns";
import { readColumn } from "../ReadColumn";
import { format } from "date-fns";
import Batch from "./Batch";
import Scheduled from "./Scheduled";

interface Recipient {
  phoneNumber: string;
  sendDate?: string
}
interface initialValues {
   selectedColumn: "",
        sendMethod: "" | "Now" | "Scheduled" | "Batch" | "ColumnDate",
        isLastSendDate: boolean,
        lastSendDate: string
        messageInput: string
        recipients: Recipient[],
        sendDate: string,
        batchSize?: number,
        intervalMinutes?: number,
        timeWindowStart?: string
        timeWindowEnd?: string
}
const Formikp = () => {
  const options = ["Now", "Scheduled", "Batch", "ColumnDate"];
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const today:string = format((new Date()), "yyyy-MM-dd'T'HH:mm'Z'");

  useEffect(() => {
    handleListUsedColumns();
    
  }, []);

  const handleListUsedColumns = async () => {
     try {
        const l = await listUsedcolumns();
        setUsedColumns(l.columnLetters || []);
        setColNum(l.columnNum || []);
      } catch (err) {
        console.error("Could not load used columns", err);
      }
  };
  
  const handleColumnSelect = async (columnLetter: string)=>{
    formik.setFieldValue("selectedColumn", columnLetter);
    const index = usedColumns.findIndex((col) => col === columnLetter);
    const absoluteColNum = colNum[index]
    try{
      const list = await listUsedcolumns();
      const result = await readColumn(absoluteColNum-list.startCol, "phoneNumber");
    const parsed: Recipient[] = JSON.parse(result || "[]");
    const recipients = parsed.map((r) => ({ phoneNumber: r.phoneNumber, sendDate: formik.values.sendDate }));
      formik.setFieldValue("recipients", recipients);
      

    }catch(err){
      console.error("Failed to read column:", err);
      formik.setFieldError("recipients", "Failed to read selected column");
    }
  }
  const handleSubmit = async (values,{setSubmitting}) =>{
    
    if (values.sendMethod === "Now") {
    values.sendDate = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
  }

    const payload = {
      sendMethod: values.sendMethod,
      isLastSendDate: values.isLastSendDate,
      lastSendDate: values.lastSendDate,
      messageContent: {
          messageInput: values.messageInput,
          recipients: values.recipients.map((r) => ({ phoneNumber: r.phoneNumber, sendDate: values.sendDate })),
        },
      batchSetting: {
          batchSize: values.batchSize,
          intervalMinutes: values.intervalMinutes,
          timeWindowStart: values.timeWindowStart,
          timeWindowEnd: values.timeWindowEnd,
        },
      };
      try {
        console.log("payload:", JSON.stringify(payload, null, 2));
        await send(payload);
        // you could show a toast here instead of alert
        alert("Data sent successfully");
      } catch (error) {
        console.error("Error sending data:", error);
        alert("Error sending data. Check console.");
      } finally {
        setSubmitting(false);
      }
      

    };
    

  
  const formik = useFormik<initialValues>({
    initialValues: {
      selectedColumn: "",
      sendMethod: "",
      isLastSendDate: false,
      lastSendDate: "",
      messageInput: "",
      recipients: [],
      sendDate: "",
      batchSize: 0,
      intervalMinutes: 0,
      timeWindowStart: "",
      timeWindowEnd: "",
    },
    validationSchema:sendSchema,
    onSubmit:handleSubmit,
    

  })
  
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">    
      <>
      {usedColumns.length>0 &&(
        <div>
          <label htmlFor="columnSelect">Select Phone Number Column</label>
        <select
          id="columnSelect"
          name="selectedColumn"
          value={formik.values.selectedColumn}          
          onChange={(e)=>handleColumnSelect(e.target.value)}
          onBlur={formik.handleBlur}          
          
        >
          <option label="Select a column" value="" disabled />
          {usedColumns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
          
        </select>
        {formik.errors.recipients && typeof formik.errors.recipients === "string" && (
            <div style={{ color: "red" }}>{formik.errors.recipients}</div>
          )}
        </div>

      )}              
      </>
      <label htmlFor="sendMethod"> Select Method</label>
      <select
        aria-required="true"
        id="sendMethod"
        value={formik.values.sendMethod}
        onChange={(e)=>formik.handleChange(e)}
        onBlur={formik.handleBlur}
      >
        <option value="" disabled>
          Select Method
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {formik.touched.sendMethod && formik.errors.sendMethod && (
          <div style={{ color: "red" }}>{formik.errors.sendMethod}</div>
        )}

      <div>
        <label htmlFor="messageInput">Message Input</label>
        <input
          id="messageInput"
          type="text"
          placeholder="Enter Message"
          value={formik.values.messageInput}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.messageInput && formik.touched.messageInput ? "input-error" : ""}
        />
        {formik.touched.messageInput && formik.errors.messageInput && (
          <div style={{ color: "red" }}>{formik.errors.messageInput}</div>
        )}
      </div>
      
      {formik.values.sendMethod==="Scheduled"&&(
        <>
        <Scheduled formik={formik}/>
        </>
      )}
      {formik.values.sendMethod==="Batch"&&(
        <>
        <Batch formik={formik}/>
        </>
      )}

      <button  disabled={formik.isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
};
export default Formikp;
