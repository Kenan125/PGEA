import React, { useEffect, useRef, useState } from "react";
import Batch from "../components/Home/Batch";
import Scheduled from "../components/Home/Scheduled";
import ColumnDate from "../components/Home/ColumnDate";
import LastSendDate from "../components/lastSendDate";
import { Navigate, useNavigate } from "react-router-dom";
import { useColumnSelect } from "../hooks/useColumnSelect";
import { useMessageInput } from "../hooks/useMessageInput";
import { replacePlaceholders } from "../utils/replacePlaceholders";
import { registerEventHandler } from "../utils/registerEventHandler";
import {
  Button,
  Dropdown,
  mergeClasses,
  Option,
  Select,
  Switch,
  Textarea,
  Toast,
  Toaster,
  ToastTitle,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { useStyles } from "../style/useStyle";
import { Warning16Regular } from "@fluentui/react-icons";

const Home = ({ formik ,classes }) => {
  //const classes = useStyles();
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Sms Başarıyla gönderildi</ToastTitle>
      </Toast>,
      { intent: "success" }
    );

  const options = [
    "Hemen Gönder",
    "İleri Tarihte Gönder",
    "Parçalı Gönder",
    "Sütundaki Tarihe Gönder",
  ];
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [colNum, setColNum] = useState<number[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigation = useNavigate();
  const navigate = useNavigate();
  const { handleColumnSelect } = useColumnSelect(formik, usedColumns, colNum);
  const { handleMessageInput } = useMessageInput(formik, usedColumns, colNum);
  const messageSelectRef = useRef<HTMLSelectElement>(null);
  const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);

  useEffect(() => {
    registerEventHandler(setUsedColumns, setColNum);
    if (formik.status === "success") {
      notify();
    }
  }, [formik.status]);

  console.log("formik:", formik);

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className={classes.myTestBackground}>
          <div>
            <div  className={classes.topRow}>
              <div className={classes.leftColumn}>
                <label htmlFor="messageInput">Mesajınız</label>
                <Textarea
                  id="messageInput"
                  appearance="outline"
                  resize="vertical"
                  placeholder="Mesajınızı giriniz"
                  value={formik.values.messageInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.messageInput && formik.errors.messageInput && (
                  <div style={{ color: "red" }}>{formik.errors.messageInput}</div>
                )}
              </div>
              <div className={classes.rightColumn}>
                <div className={classes.topRight}>
                  <div>SMS Sayısı: 1</div>
                  <div>Son Ek: B043</div>
                  <div>Karakter Uzunluğu: {formik.values.messageInput.length}</div>
                </div>
                {/* önizleme */}
              </div>
            </div>
            <div className={classes.middleRow}>
              <div className={classes.tertiaryButtons}>
                <Button
                  id={"preview"}
                  type="button"
                  onClick={() => {
                    if (!formik.values.selectedPhoneNumberColumn) {
                      formik.setFieldTouched("selectedPhoneNumberColumn", true);
                      return;
                    }
                    setIsPreviewOpen(true);
                  }}
                >
                  
                  Önizleme
                </Button>
                <Button
                  id={"customize"}
                  onClick={() => {
                    setShowCustomizeSelect(true);
                  }}
                  type="button"
                >
                  {" "}
                  Kişiselleştir{" "}
                </Button>
              </div>
              {showCustomizeSelect && (
                <div className={classes.customize}>
                  <label htmlFor="messageColumn" className={classes.label}>
                    Kişiselleştirmek İçin Sütun Seçin
                  </label>
                  <Select
                    ref={messageSelectRef}
                    id="messageColumn"
                    name="selectedMessageInput"
                    value={formik.values.selectedMessageInput}
                    onChange={async (e) => {
                      const colLetter = e.target.value;
                      formik.setFieldValue("selectedMessageInput", colLetter);
                      await handleMessageInput(`Sutun_${colLetter}`, colLetter);
                      formik.setFieldValue(
                        "messageInput",
                        formik.values.messageInput + `{Sutun_${colLetter}}`
                      );
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option label="Sütun seçin" value="" disabled />
                    {usedColumns.map((col, index) => (
                      <option key={index} value={col}>
                        {col}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>

            <div className={classes.bottomRow}  >
              <div className={classes.leftColumn}  >
                {/* Gönderim Şekli */}
                <label id="label" htmlFor="sendMethod"></label>
                <Dropdown  
                  id="sendMethod"
                  value={formik.values.sendMethod}
                  onOptionSelect={(_, data) => formik.setFieldValue("sendMethod", data.optionValue)}
                  onBlur={formik.handleBlur}
                  placeholder="Gönderim Şekli"
                                   
                >
                  {options.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Dropdown>                
                {formik.touched.sendMethod && formik.errors.sendMethod && (
                  <div className={classes.error}>{formik.errors.sendMethod}</div>
                )}
              </div>
              <div className={classes.rightColumn}>
                {/* Alıcı */}
                <label id="label" htmlFor="phoneNumberColumn">
                  Alıcı
                </label>
                <div className={classes.phoneNumberColumn}>
                  <Dropdown
                
                  id="phoneNumberColumn"
                  name="selectedPhoneNumberColumn"
                  value={formik.values.selectedPhoneNumberColumn}
                  onOptionSelect={(_event, data) => {
                    handleColumnSelect(
                      "selectedPhoneNumberColumn",
                      data.optionValue,
                      "phoneNumber"
                    );
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="Alıcı Sütunu"
                >
                  {usedColumns.map((col, index) => (
                    <Option key={index} value={col}>
                      {col}
                    </Option>
                  ))}
                </Dropdown>

                </div>
                

                {formik.touched.selectedPhoneNumberColumn &&
                  formik.errors.selectedPhoneNumberColumn && (
                    <div className={classes.error}>{formik.errors.selectedPhoneNumberColumn}</div>
                  )}
                  
              </div>
            </div>
          </div>

          {formik.values.sendMethod === "İleri Tarihte Gönder" && (
            <>
              <Scheduled formik={formik} classes={classes} />
            </>
          )}

          {formik.values.sendMethod === "Parçalı Gönder" && (
            <>
              <Batch formik={formik} classes={classes} />
            </>
          )}

          {formik.values.sendMethod === "Sütundaki Tarihe Gönder" && (
            <>
              <ColumnDate
                formik={formik}
                usedColumns={usedColumns}
                handleColumnSelect={handleColumnSelect}
                classes={classes}
              />
            </>
          )}
          <div>
            <div className={classes.checkbox}>
              <Switch
                type="checkbox"
                id="isLastSendDate"
                label={"Son Gönderim Tarihi Belirle"}
                className={classes.formControl}
                checked={formik.values.isLastSendDate}
                onChange={(e) => {
                  formik.setFieldValue("isLastSendDate", e.target.checked);
                  if (!e.target.checked) {
                    formik.setFieldValue("lastSendDate", "");
                  }
                }}
              />
              
            </div>
            <LastSendDate formik={formik} classes={classes} />
          </div>

          <div className={classes.buttonRow}>
            <Button onClick={formik.resetForm} type="button">
              Iptal
            </Button>

            <Button
              appearance="primary"
              onSubmit={formik.handleSubmit}
              type="submit"
              className={classes.mainButton}
            >
              Tamam
            </Button>
            <Toaster toasterId={toasterId} />
            
          </div>
        </div>

        {isPreviewOpen && (
          <div className={classes.previewContainer}>
            <div className={classes.nibIosTemplate}>
              
              <div className={classes.nibIosMessages}>
                <div className={classes.nibIosTime}>
                  Mesajlar<br></br>
                </div>
                <div className={mergeClasses(classes.nibIosMsg, classes.nibReceived)}>Mesaj Önizlemesi</div>
                <div className={mergeClasses(classes.nibIosMsg, classes.nibSent)}>
                  {formik.values.messageInput
                    ? replacePlaceholders(formik.values.messageInput, formik.values.recipients[0])
                    : "Boş Mesaj"}
                </div>
              </div>
            </div>
            <div className={classes.previewButton}>
              <Button
                id={"kapat"}
                //label={"Kapat"}
                onClick={() => setIsPreviewOpen(false)}
                type="button"
              >
                Kapat
              </Button>
            </div>
          </div>
        )}
      </form>
      {/* {formik.status === "success" &&
                <Navigate to="/Successful" state={formik.status} replace={true} />
            } */}
            
    </>
  );
};
export default Home;
