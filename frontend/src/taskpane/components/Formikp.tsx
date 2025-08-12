import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { sendSchema } from "../schemas/sendSchema";
import { send } from "../send";
import { listUsedcolumns } from "../listusedcolumns";
import { readColumn } from "../ReadColumn";
import { format } from "date-fns";
import Batch from "./Batch";
import Scheduled from "./Scheduled";
import ColumnDate from "./ColumnDate";
import Button from "./Button"




interface Recipient {
  phoneNumber: string;
  sendDate?: string;
}
interface initialValues {
  selectedPhoneNumberColumn: "";
  selectedSendDateColumn: "";
  sendMethod: "" | "Now" | "Scheduled" | "Batch" | "ColumnDate";
  isLastSendDate: boolean;
  lastSendDate: string;
  messageInput: string;
  recipients: Recipient[];
  sendDate: string;
  batchSize?: number;
  intervalMinutes?: number;
  timeWindowStart?: string;
  timeWindowEnd?: string;
  time?: string;
}
const Formikp = () => {
  const options = ["Now", "Scheduled", "Batch", "ColumnDate"];
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const today: string = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipient, setRecipient] = useState("")

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

  const handleColumnSelect = async (
    
    formikField: string,
    columnLetter: string,
    targetField: "phoneNumber" | "sendDate",
    time?:string
  ) => 
    {
    formik.setFieldValue(formikField, columnLetter);

    const index = usedColumns.findIndex((col) => col === columnLetter);
    const absoluteColNum = colNum[index];

    try {
      const list = await listUsedcolumns();
      const values = await readColumn(absoluteColNum - list.startCol); // array of raw values

      const current = formik.values.recipients || [];
      const maxLen = Math.max(current.length, values.length);

      const recipients = Array.from({ length: maxLen }).map((_, i) => {
        const existing = current[i] || { phoneNumber: "", sendDate: "" };
        const val = values[i] ?? "";

        if (targetField === "sendDate") {
          // Try to parse date-like values robustly
          const parsed =
            val instanceof Date
              ? val
              : typeof val === "number"
                ? new Date(val)
                : new Date(String(val));
          const sendDate =
            parsed && !isNaN(parsed.getTime()) ? format(parsed, `yyyy-MM-dd'T'${time}'Z'` ) : "";
          return { ...existing, sendDate };
        }

        // phone number column
        return { ...existing, phoneNumber: String(val ?? "") };
      });

      formik.setFieldValue("recipients", recipients);
    } catch (err) {
      console.error("Failed to read column:", err);
      formik.setFieldError("recipients", "Failed to read selected column");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values.sendMethod === "Now") {
      values.sendDate = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
    }

    const payload = {
      sendMethod: values.sendMethod,
      isLastSendDate: values.isLastSendDate,
      lastSendDate: values.lastSendDate,
      messageContent: {
        messageInput: values.messageInput,
        recipients:
          values.sendMethod === "ColumnDate"
            ? values.recipients // keep per-recipient sendDate
            : values.recipients.map((r) => ({
                phoneNumber: r.phoneNumber,
                sendDate: values.sendDate,
              })),
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
      //await send(payload);
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
      selectedPhoneNumberColumn: "",
      selectedSendDateColumn: "",
      sendMethod: "",
      isLastSendDate: false,
      lastSendDate: "",
      messageInput: "",
      recipients: [],

      sendDate: "",
      batchSize: 0,
      intervalMinutes: 0,
      timeWindowStart: "09:30",
      timeWindowEnd: "18:00",
      time: ""
    },
    validationSchema: sendSchema,
    onSubmit: handleSubmit,
  });
  console.log(formik);
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <>
        {usedColumns.length > 0 && (

          //container
          <div id="container">
              <div id="topRow">
                <div id="leftColumn">
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
                <div id="rightColumn">
                  <div>SMS Sayısı: 1</div>
                  <div>Son Ek: B043</div>
                  <div>Karakter Uzunluğu: {Text.length}</div>

                  {/* önizleme */}
                  <Button
              label={"Önizleme"}
              type="TERTIARY"
              onClick={() => {
                // önce alıcı seçilmesi için
                if (!recipient) {
                  setErrorMessage("Lütfen önce alıcıyı seçiniz.");
                  return;
                }
                setErrorMessage("");
                setIsPreviewOpen(true)
              }}
            />
            
                </div>
              </div>









            <label id="label" htmlFor="phoneNumberColumn">Select Phone Number Column</label>
            <select
              id="phoneNumberColumn"
              name="selectedPhoneNumberColumn"
              value={formik.values.selectedPhoneNumberColumn}
              onChange={(e) =>
                handleColumnSelect("selectedPhoneNumberColumn", e.target.value, "phoneNumber")
              }
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
      <label id="label" htmlFor="sendMethod"> Select Method</label>
      <select
        aria-required="true"
        id="sendMethod"
        value={formik.values.sendMethod}
        onChange={(e) => formik.handleChange(e)}
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
        
      </div>

      {formik.values.sendMethod === "Scheduled" && (
        <>
          <Scheduled formik={formik} />
        </>
      )}
      {formik.values.sendMethod === "Batch" && (
        <>
          <Batch formik={formik} />
        </>
      )}
      {formik.values.sendMethod === "ColumnDate" && (
        <>
          <ColumnDate
            formik={formik}
            usedColumns={usedColumns}
            handleColumnSelect={handleColumnSelect}
          />
        </>
      )}

      <button disabled={formik.isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
};
export default Formikp;
