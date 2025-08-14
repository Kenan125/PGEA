import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { sendSchema } from "../schemas/sendSchema";
import { send } from "../send";
import { listUsedcolumns } from "../listusedcolumns";
import { readColumn } from "../ReadColumn";
import { format } from "date-fns";
import Batch from "../components/Batch";
import Scheduled from "../components/Scheduled";
import ColumnDate from "../components/ColumnDate";
import Button from "../components/Button";
import { MessageBar } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import "../style.css";

interface Recipient {
  phoneNumber: string;
  sendDate?: string;
}
interface initialValues {
  selectedPhoneNumberColumn: "";
  selectedSendDateColumn: "";
  sendMethod:
    | ""
    | "Hemen Gönder"
    | "İleri Tarihte Gönder"
    | "Parçalı Gönder"
    | "Sütundaki Tarihe Gönder";
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
  const options = [
    "Hemen Gönder",
    "İleri Tarihte Gönder",
    "Parçalı Gönder",
    "Sütundaki Tarihe Gönder",
  ];
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const today: string = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipient, setRecipient] = useState("");
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

  const handleCancel = () => {
  formik.resetForm(); 
  navigation("/"); 
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
            parsed && !isNaN(parsed.getTime()) ? format(parsed, `yyyy-MM-dd'T'${time}'Z'`) : "";
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
    if (values.sendMethod === "Hemen Gönder") {
      values.sendDate = format(new Date(), "yyyy-MM-dd'T'HH:mm'Z'");
    }

    const payload = {
      sendMethod: values.sendMethod,
      isLastSendDate: values.isLastSendDate,
      lastSendDate: values.lastSendDate,
      messageContent: {
        messageInput: values.messageInput ? values.messageInput + " B043" : "",
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
      time: "",
    },
    validationSchema: sendSchema,
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
                <label htmlFor="messageInput">Mesajınız</label>
                <input
                  id="messageInput"
                  type="text"
                  placeholder="Enter Message"
                  value={formik.values.messageInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.messageInput && formik.touched.messageInput ? "input-error" : ""
                  }
                />
                {formik.touched.messageInput && formik.errors.messageInput && (
                  <div style={{ color: "red" }}>{formik.errors.messageInput}</div>
                )}
              </div>
              <div className="rightColumn">
                <div className="topRight">
                  <div>SMS Sayısı: 1</div>
                  <div>Son Ek: B043</div> 
                  <div>Karakter Uzunluğu: {formik.values.messageInput.length}</div>{" "}
                </div>
                {/* önizleme */}

                <Button
                  id={"preview"}
                  label={"Önizleme"}
                  type="TERTIARY"
                  onClick={() => {
                    // önce alıcı seçilmesi için recipient i telefon sütunuyla değiştir
                    if (!recipient) {
                      setErrorMessage("Lütfen önce alıcıyı seçiniz.");
                      return;
                    }
                    setErrorMessage("");
                    setIsPreviewOpen(true);
                  }}
                />

                {errorMessage && (
                  <MessageBar intent="error">
                    {errorMessage}
                    <Button id={"kapat"} label={"Kapat"} type={"TERTIARY"} onClick={() => setErrorMessage("")} />
                  </MessageBar>
                )}

                {/* kişiselleştir */}
                {/* <Button
                label={"Kişiselleştir"}
                type={"TERTIARY"}
                onClick={}
                /> */}
              </div>
            </div>
            <div className="bottomRow">
              <div className="leftColumn">
                {/* Gönderim Şekli */}
                <label id="label" htmlFor="sendMethod">
                  {" "}
                  Gönderim Şekli
                </label>
                <select
                  aria-required="true"
                  id="sendMethod"
                  value={formik.values.sendMethod}
                  onChange={(e) => formik.handleChange(e)}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Seçiniz
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
                  Alıcı
                </label>
                <select
                  id="phoneNumberColumn"
                  name="selectedPhoneNumberColumn"
                  value={formik.values.selectedPhoneNumberColumn}
                  onChange={(e) => {
                    handleColumnSelect("selectedPhoneNumberColumn", e.target.value, "phoneNumber");
                    setRecipient(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option label="Sütun seçiniz" value="" disabled />
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
        {formik.values.sendMethod === "İleri Tarihte Gönder" && (
          <>
            <Scheduled formik={formik} />
          </>
        )}
        {formik.values.sendMethod === "Parçalı Gönder" && (
          <>
            <Batch formik={formik} />
          </>
        )}
        {formik.values.sendMethod === "Sütundaki Tarihe Gönder" && (
          <>
            <ColumnDate
              formik={formik}
              usedColumns={usedColumns}
              handleColumnSelect={handleColumnSelect}
            />
          </>
        )}
        <div >
          {/*checkbox buraya*/}
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id="isLastSendDate"
                    className="form-control"
                    checked={formik.values.isLastSendDate}
                    onChange={(e) => formik.setFieldValue("isLastSendDate", e.target.checked)}
                  />
                  <label htmlFor="isLastSendDate" className="checkbox-title">
                    Son Gönderim Tarihi Belirle
                  </label>
                  
                </div>
                
                  {formik.values.isLastSendDate && (
                    <div className="lastSendDate" >
                      <label htmlFor="lastSendDate" className="checkbox-label">
                        Son Gönderim Tarihi
                      </label>
                      <input
                        id="lastSendDate"
                        className="checkbox-form-control"
                        type="datetime-local"
                        value={formik.values.lastSendDate}
                        onChange={formik.handleChange}
                      />
                      
                    </div>
                    
                  )}
                  {formik.touched.lastSendDate && formik.errors.lastSendDate && (
                        <div className="error">{formik.errors.lastSendDate}</div>
                      )}
                
        </div>
        

        <div className="buttonRow">
          <Button id={"iptal"} label={"İptal"} onClick={handleCancel} type="SECONDARY" />
          {/* <Button id={"tamam"}   label={"Tamam"} onClick={formik.handleSubmit} type={"MAIN"} /> */}
          
        <button disabled={formik.isSubmitting} type="submit" className="mainButton">
          Tamam
        </button>
        </div>

        
      </div>

       {isPreviewOpen && (
        <div className="preview-container">
          <div className="preview-content">
            <label className="preview-title">Mesaj Önizlemesi</label>
            <p className="preview-message">
              {formik.values.messageInput ? formik.values.messageInput  : "Boş Mesaj"}
            </p>

            

            <div className="preview-button">
              <Button id={"kapat"} label={"Kapat"} onClick={() => setIsPreviewOpen(false)} type={"MAIN"} />
            </div>
          </div>
        </div>
      )} 
      
  


    </form>
  );
};
export default Formikp;
