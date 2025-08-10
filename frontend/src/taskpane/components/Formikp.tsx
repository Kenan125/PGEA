import React, { useEffect, useState } from "react";
import { send } from "../send";
import { format } from "date-fns";
import { listUsedcolumns } from "../listusedcolumns";
import { readColumn } from "../ReadColumn";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";

import * as Yup from "yup";

import {
  Button,
  Dropdown,
  DropdownProps,
  Field,
  Label,
  makeStyles,
  Option,
  useId,
} from "@fluentui/react-components";
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});
// ✅ Yup validation schema
const validationSchema = Yup.object({
  selectedColumn: Yup.string().required("Please select a phone number column."),
  sendMethod: Yup.string().required("Please select a send method."),
  messageInput: Yup.string().required("Message is required."),
  // Conditional validations for Batch
  batchSize: Yup.number().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Batch size required").min(1),
  }),
  intervalMinutes: Yup.number().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Interval required").min(1),
  }),
  timeWindowStart: Yup.string().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Start time required"),
  }),
  timeWindowEnd: Yup.string().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("End time required"),
  }),
  sendDate: Yup.string().when("sendMethod", {
    is: (val) => val === "Scheduled" || val === "Batch",
    then: (schema) => schema.required("Send date required"),
  }),
});

const Formikp = () => {
    
  const dropdownId = useId("dropdown-default");
  const options = ["Now", "Scheduled", "Batch", "ColumnDate"];
  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");

  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const [recipients, setRecipients] = useState([]);

  // Fetch columns once
  // useEffect(() => {
  //   (async () => {
  //     const list = await listUsedcolumns();
  //     setUsedColumns(list.columnLetters);
  //     setColNum(list.columnInfo);
  //   })();
  // }, []);

  const handleReadColumn = async (colNum: number) => {
    const result = await readColumn(colNum, "phoneNumber");
    const parsed = JSON.parse(result);
    setRecipients(parsed);
  };

  return (
    <Formik
      initialValues={{
        selectedColumn: "",
        sendMethod: "",
        messageInput: "",
        isLastSendDate: false,
        lastSendDate: "",
        sendDate: today,
        batchSize: 0,
        intervalMinutes: 0,
        timeWindowStart: "",
        timeWindowEnd: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const payload = {
          sendMethod: values.sendMethod,
          isLastSendDate: values.isLastSendDate,
          lastSendDate: values.lastSendDate || undefined,
          messageContent: {
            messageInput: values.messageInput,
            recipients: recipients.map((r) => ({
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
          console.log("Payload:", payload);
          await send(payload);
          alert("Message sent successfully");
        } catch (error) {
          console.error("Error sending data:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          {usedColumns.length > 0 && (
            <Field
              label="Select Phone Number Column"
              required
              validationMessage={<ErrorMessage name="selectedColumn" />}
            >
              <Dropdown
                id="columnSelect"
                placeholder="Select Column"
                value={values.selectedColumn}
                onOptionSelect={(_event, data) => {
                  setFieldValue("selectedColumn", data.optionValue);
                  const index = usedColumns.findIndex(
                    (col) => col === data.optionValue
                  );
                  handleReadColumn(colNum[index]);
                }}
              >
                {usedColumns.map((col, index) => (
                  <Option key={index} value={col}>
                    {col}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          )}

          <Field
            label="Send Method"
            required
            validationMessage={<ErrorMessage name="sendMethod" />}
          >
            <Dropdown
              id={dropdownId}
              placeholder="Select Method"
              value={values.sendMethod}
              onOptionSelect={(_, data) =>
                setFieldValue("sendMethod", data.optionValue)
              }
            >
              {options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </Field>

          <div>
            <label>Message Input</label>
            <FormikField name="messageInput" className="form-control" />
            <ErrorMessage
              name="messageInput"
              component="div"
              
            />
          </div>

          {/* Conditional Fields */}
          {values.sendMethod === "Scheduled" || values.sendMethod === "Batch" ? (
            <div>
              <label>Start Time</label>
              <FormikField
                name="sendDate"
                type="datetime-local"
                className="form-control"
              />
              <ErrorMessage
                name="sendDate"
                component="div"
                
              />
            </div>
          ) : null}

          {values.sendMethod === "Batch" && (
            <>
              <div>
                <label>Batch Size</label>
                <FormikField
                  name="batchSize"
                  type="number"
                  className="form-control"
                />
                <ErrorMessage
                  name="batchSize"
                  component="div"
                  
                />
              </div>

              <div>
                <label>Interval Minutes</label>
                <FormikField
                  name="intervalMinutes"
                  type="number"
                  className="form-control"
                />
                <ErrorMessage
                  name="intervalMinutes"
                  component="div"
                  
                />
              </div>

              <div>
                <label>Time Window Start</label>
                <FormikField
                  name="timeWindowStart"
                  type="time"
                  className="form-control"
                />
                <ErrorMessage
                  name="timeWindowStart"
                  component="div"
                  
                />
              </div>

              <>
                <label>Time Window End</label>
                <FormikField
                  name="timeWindowEnd"
                  type="time"
                  className="form-control"
                />
                <ErrorMessage
                  name="timeWindowEnd"
                  component="div"
                  
                />
              </>

              <div>
                <label htmlFor="checkbox">Is Last Send Date</label>
                <input
                id="checkbox"
                  type="checkbox"
                  checked={values.isLastSendDate}
                  onChange={(e) =>
                    setFieldValue("isLastSendDate", e.target.checked)
                  }
                />
              </div>

              {values.isLastSendDate && (
                <div>
                  <label>Last Send Date</label>
                  <FormikField
                    name="lastSendDate"
                    type="datetime-local"
                    className="form-control"
                  />
                </div>
              )}
            </>
          )}

          <div>
            <Button type="submit" disabled={isSubmitting}>
              Send Message
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Formikp;
