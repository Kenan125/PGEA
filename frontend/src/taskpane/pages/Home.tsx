import React, { useEffect, useRef, useState } from "react";
import Batch from "../components/Home/Batch";
import Scheduled from "../components/Home/Scheduled";
import ColumnDate from "../components/Home/ColumnDate";
import { useColumnSelect } from "../hooks/useColumnSelect";
import { useMessageInput } from "../hooks/useMessageInput";
import { registerEventHandler } from "../utils/registerEventHandler";
import {
  Button,  
  Toast,
  Toaster,
  ToastTitle,
  useId,
  useToastController,
} from "@fluentui/react-components";
import Preview from "../components/preview";
import SendDate from "../components/sendDate";
import { useNavigate } from "react-router-dom";
import MessageInput from "../components/messageInput";
import SendMethod from "../components/sendMethod";
import PhoneNumber from "../components/phoneNumber";
import Customize from "../components/customize";
import IsLastSendDate from "../components/isLastSendDate";
import ConfirmForm from "../components/confirmForm";

const Home = ({ formik, classes }) => {
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
  console.log("sendDate:", formik.values.sendDate);

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className={classes.myTestBackground}>
          <div>
            <div className={classes.topRow}>
              <MessageInput formik={formik} classes={classes} />
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
                    if (!formik.values.phoneNumber) {
                      formik.setFieldTouched("phoneNumberp", true);
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
                <Customize
                  formik={formik}
                  classes={classes}
                  messageSelectRef={messageSelectRef}
                  handleMessageInput={handleMessageInput}
                  usedColumns={usedColumns}
                />
              )}
            </div>

            <div className={classes.bottomRow}>
              <SendMethod formik={formik} classes={classes} options={options} />
              <PhoneNumber
                formik={formik}
                classes={classes}
                handleColumnSelect={handleColumnSelect}
                usedColumns={usedColumns}
              />
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
            <IsLastSendDate formik={formik} classes={classes} />
            {formik.values.isLastSendDate && (
              <SendDate
                formik={formik}
                classes={classes}
                htmlFor={"lastSendDate"}
                value={formik.values.lastSendDate}
                label={"Son Gönderme tarihi"}
              />
            )}
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
            <ConfirmForm formik={formik}/>
            <Toaster toasterId={toasterId} />
          </div>
        </div>

        {isPreviewOpen && (
          <Preview classes={classes} formik={formik} setIsPreviewOpen={setIsPreviewOpen} />
        )}
      </form>
      {/* {formik.status === "success" &&
                <Navigate to="/Successful" state={formik.status} replace={true} />
            } */}
    </>
  );
};
export default Home;
