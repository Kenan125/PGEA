import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import Button from "../components/Button";
import { MessageBar } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import { testMessage } from "./testMessages";
import { gettext } from "../utils/gettext";
import { listUsedcolumns } from "../utils/listusedcolumns";

interface Recipient {
  phoneNumber: string;
  sendDate?: string;
  messageInput: string;
}
interface initialValues {
  selectedPhoneNumberColumn: "";
  selectedSendDateColumn: string;
  selectedMessageInput: string;
  sendMethod: "" | "Now" | "Scheduled" | "Batch" | "ColumnDate";
  messageInput: string;
  recipients: Recipient[];
  sendDate: string;
}
const TestMessage = () => {
  const options = ["Now", "Scheduled", "Batch", "ColumnDate"];
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const today: string = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
  const navigation = useNavigate();

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
    time?: string
  ) => {
    formik.setFieldValue(formikField, columnLetter);

    const index = usedColumns.findIndex((col) => col === columnLetter);
    const absoluteColNum = colNum[index];

    try {
      const list = await listUsedcolumns();
      const values = await testMessage(absoluteColNum - list.startCol, targetField, time);

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
  };
  const handleMessageInput = async (formikField: string, columnLetter: string) => {
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

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values.sendMethod === "Now") {
      values.sendDate = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
    }

    const payloadRecipients = values.recipients.map((recipient) => {
      let personalizedMessage = values.messageInput;

      // Replace {Column_X} placeholders with actual values
      Object.keys(recipient).forEach((key) => {
        if (key.startsWith("Column_")) {
          const regex = new RegExp(`\\{${key}\\}`, "g");
          personalizedMessage = personalizedMessage.replace(regex, recipient[key] || "");
        }
      });

      return {
        phoneNumber: recipient.phoneNumber,
        sendDate: values.sendDate,
        messageInput: personalizedMessage,
      };
    });

    const payload = {
      sendMethod: values.sendMethod,
      messageContent: {
        recipients: payloadRecipients,
      },
    };

    try {
      console.log("payload:", JSON.stringify(payload, null, 2));
      // await send(payload);
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
      selectedMessageInput: "",
      sendMethod: "",
      messageInput: "",

      recipients: [],

      sendDate: "",
    },
    //validationSchema: sendSchema,
    onSubmit: handleSubmit,
  });
  console.log(formik);
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="my-test-background">
        {usedColumns.length > 0 && (
          //container
          <div>
            <div className="topRow">
              <div className="leftColumn">
                <label htmlFor="messageInput">Message Input</label>
                <input
                  id="messageInput"
                  type="text"
                  placeholder="Enter Message"
                  value={formik.values.messageInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="rightColumn">
                <label id="label" htmlFor="messageColumn">
                  Select custom message column
                </label>
                <select
                  id="messageColumn"
                  name="selectedMessageInput"
                  value={formik.values.selectedMessageInput}
                  onChange={async (e) => {
                    const colLetter = e.target.value;

                    // Store the column letter in formik
                    formik.setFieldValue("selectedMessageInput", colLetter);

                    // Fetch the column values and store under Column_X in recipients
                    await handleMessageInput(`Column_${colLetter}`, colLetter);

                    // Append a placeholder into the message template
                    formik.setFieldValue(
                      "messageInput",
                      formik.values.messageInput + `{Column_${colLetter}}`
                    );
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option label="Select a column" value="" disabled />
                  {usedColumns.map((col, index) => (
                    <option key={index} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bottomRow">
              <div className="leftColumn">
                {/* Gönderim Şekli */}
                <label id="label" htmlFor="sendMethod">
                  {" "}
                  Select Method
                </label>
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
              </div>
              <div className="rightColumn">
                {/* Alıcı */}
                <label id="label" htmlFor="phoneNumberColumn">
                  Select Phone Number Column
                </label>
                <select
                  id="phoneNumberColumn"
                  name="selectedPhoneNumberColumn"
                  value={formik.values.selectedPhoneNumberColumn}
                  onChange={(e) => {
                    handleColumnSelect("selectedPhoneNumberColumn", e.target.value, "phoneNumber");
                  }}
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
            </div>
          </div>
        )}

        {/* kenanın buton */}
        <button disabled={formik.isSubmitting} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default TestMessage;
