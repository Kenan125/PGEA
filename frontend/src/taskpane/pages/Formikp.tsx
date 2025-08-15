import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { sendSchema } from "../schemas/sendSchema";

import { format } from "date-fns";
import Batch from "./Batch";
import Scheduled from "./Scheduled";
import ColumnDate from "./ColumnDate";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../style/style.css";
import { listUsedcolumns } from "../utils/listusedcolumns";
import { initialValues } from "../interfaces/initialValues";
import { onSubmit } from "../hooks/onSubmit";
import { send } from "../send";
import { useSendForm } from "../hooks/useSendForm";
import { useColumnSelect } from "../hooks/useColumnSelect";
import { useMessageInput } from "../hooks/useMessageInput";





const Formikp = () => {
  const options = [
    "Hemen Gönder",
    "İleri Tarihte Gönder",
    "Parçalı Gönder",
    "Sütundaki Tarihe Gönder",
  ];
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const today: string = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const navigation = useNavigate();
  const { formik } = useSendForm();
  const { handleColumnSelect } = useColumnSelect(formik, usedColumns, colNum);
  const { handleMessageInput } = useMessageInput(formik, usedColumns, colNum);
  const messageSelectRef = useRef<HTMLSelectElement>(null);
  const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);

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
                <textarea
                  id="messageInput"
                  
                  placeholder="Mesajınızı giriniz"
                  value={formik.values.messageInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="rightColumn">
                <div className="topRight">
                  <div>SMS Sayısı: 1</div>
                  <div>Son Ek: B043</div>
                  <div>Karakter Uzunluğu: {formik.values.messageInput.length}</div>{" "}
                </div>
                {/* önizleme */}
              </div>
            </div>
            <div className="middleRow">
              <div className="tertiary-buttons">
                <Button
                  id={"preview"}
                  label={"Önizleme"}
                  type="TERTIARY"
                  onClick={() => {
                    if (!formik.values.selectedPhoneNumberColumn) {
                      formik.setFieldTouched("selectedPhoneNumberColumn", true);
                      return;
                    }
                    setErrorMessage("");
                    setIsPreviewOpen(true);
                  }}
                />
                <Button
                  id={"customize"}
                  label={"Kişiselleştir"}
                  onClick={() => {
                    setShowCustomizeSelect(true);
                    setTimeout(() => {
                      if (messageSelectRef.current) {
                        messageSelectRef.current.focus();
                        messageSelectRef.current.click();
                      }
                    }, 0);
                  }}
                  type={"TERTIARY"}
                />
                
                {showCustomizeSelect && (
                <div className="customize">
                  <label htmlFor="messageColumn" className="label">Kişiselletirmek İçin Sütun Seçin</label>
                  <select
                    ref={messageSelectRef}
                    id="messageColumn"
                    name="selectedMessageInput"
                    value={formik.values.selectedMessageInput}
                    onChange={async (e) => {
                      const colLetter = e.target.value;
                      formik.setFieldValue("selectedMessageInput", colLetter);
                      await handleMessageInput(`Column_${colLetter}`, colLetter);
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
              )}

               

                

                

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

                {/*checkbox*/}
                {/* <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="finalDateCheckbox"
                    checked={showFinalDate}
                    onChange={(e) => setShowFinalDate(e.target.checked)}
                  />
                  <label htmlFor="finalDateCheckbox" className="checkBoxLabel">
                    Son Gönderim Tarihi Belirle
                  </label>
                </div> */}

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
                {formik.touched.selectedPhoneNumberColumn &&
                  formik.errors.selectedPhoneNumberColumn && (
                    <div className="error">{formik.errors.selectedPhoneNumberColumn}</div>
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

        <div>
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
            <div className="lastSendDate">
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
          
          

          <button disabled={formik.isSubmitting}   type="submit" className="mainButton">
            Tamam
          </button>
          { formik.isSubmitting &&(
            <div>Success message here: </div>
          )}
        </div>
      </div>

      {isPreviewOpen && (
        <div className="preview-container">
          <div className="nib-ios-template">
          <div className="nib-ios-header"></div>
          <div className="nib-ios-messages">
            <div className="nib-ios-time">
              Messages<br></br>
            </div>
            <div className="nib-ios-msg nib-recieved">Mesaj Önizlemesi</div>
            <div className="nib-ios-msg nib-sent">
              {formik.values.messageInput ? formik.values.messageInput : "Boş Mesaj"}
            </div>
          </div>
        </div>
          
            

            <div className="preview-button">
              <Button
                id={"kapat"}
                label={"Kapat"}
                onClick={() => setIsPreviewOpen(false)}
                type={"MAIN"}
              />
            </div>
          </div>
        
      )} 
      
  


    </form>
  );
};
export default Formikp;
