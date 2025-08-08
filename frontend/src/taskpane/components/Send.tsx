import React, { useEffect, useState } from "react";

import { send } from "../send";

import { format } from "date-fns";
import { listUsedcolumns } from "../listusedcolumns";
import { readColumn } from "../ReadColumn";
import {
  Dropdown,
  DropdownProps,
  Field,
  makeStyles,
  MessageBar,
  MessageBarActions,
  Option,
  Textarea,
  useId,
} from "@fluentui/react-components";
import Button from "./Button";
import Itemselector from "./Itemselector";

const useStyles = makeStyles({
  //gri kutu
  container: {
    backgroundColor: "#d9d9d9",
    borderRadius: "0px 0px 12px 12px",
    padding: "50px 30px",
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
    boxSizing: "border-box",
    fontFamily: "Segoe UI, sans-serif",
    marginTop: "0px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "20px",
    marginTop: "20px",
  },
  leftColumn: {
    flexBasis: "60%",
    minWidth: "250px",
    marginRight: "10px",
  },
  //sms sayısı,son ek,..
  rightColumn: {
    width: "160px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "14px",
    color: "#757575",
  },
  label: {
    fontWeight: 600,
    marginBottom: "4px",
    color: "#353535",
    fontSize: "15px",
  },

  //kime kısmı
  input: {
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    marginBottom: "8px",
  },
  //message area beyaz mesaj kutusu
  messageArea: {
    width: "100%",
    height: "100px",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "8px",
    boxSizing: "border-box",
    gap: "60px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
  },

  //kime-alıcı kısmı
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "40px",
    gap: "10px",
    alignItems: "center",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "60px",
    gap: "10px",
  },

  kimeDropdown: {
    display: "flex",
    flexWrap: "wrap",
    width: "160px",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  checkboxLabel: {
    marginLeft: "8px",
    fontSize: "14px",
  },
  dateTimeContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  dateTimeInput: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
});

const Send = () => {
  const styles = useStyles();
  const dropdownId = useId("dropdown-default");
  const options = ["Now", "Scheduled", "Batch", "ColumnDate"];
  const today: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string; sendDate: string }>>(
    []
  );
  const [sendMethod, setSendMethod] = useState<string>("");
  const [isLastSendDate, setIsLastSendDate] = useState<boolean>(false);
  const [lastSendDate, setLastSendDate] = useState<string>();
  const [messageInput, setMessageInput] = useState<string>("");
  const [sendDate, setSendDate] = useState<string>(today);
  const [batchSize, setBatchSize] = useState<number>(0);
  const [intervalMinutes, setIntervalMinutes] = useState<number>(0);
  const [timeWindowStart, setTimeWindowStart] = useState<string>();
  const [timeWindowEnd, setTimeWindowEnd] = useState<string>();
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [usedNumColumns, setUsedNumColumns] = useState<number | undefined>();
  const [colNum, setColNum] = useState<number[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [sendMethodError, setSendMethodError] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [columns, setColumns] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [values, setValues] = useState([]);
  const [showFinalDate, setShowFinalDate] = useState(false);
  const [finalDate, setFinalDate] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [sendType, setSendType] = useState("");

  const sendOptions = [
    //label-value yap burayı
    { value: "HemenGönder", label: "Hemen Gönder" },
    { value: "İleriTarihteGönder", label: "İleri Tarihte Gönder" },
    { value: "ParçalıGönder", label: "Parçalı Gönder" },
    { value: "SütundakiTariheGönder", label: "Sütundaki Tarihe Gönder" },

  ];


  useEffect(() => {
    handleListUsedColumns();
    getFilledColumns().then((data) => {
      setColumns(data);
    });
  }, []);
  const handleSendMethodSelect = (data) => {
    // When the user selects an option, clear any existing error.
    setSendMethod(data.optionValue);
    if (data.optionValue) {
      setSendMethodError(undefined);
    }
  };
  const handleListUsedColumns = async () => {
    const list = await listUsedcolumns();
    setUsedColumns(list.columnLetters);
    setColNum(list.columnInfo);
  };
  const handleReadColumn = async () => {
    const result = await readColumn(usedNumColumns, text);
    const parsed = JSON.parse(result);
    setRecipients(parsed);
  };

  const handleChecked = (e) => {
    const newValue = e.target.checked;
    setIsLastSendDate(newValue);

    if (!newValue) {
      setLastSendDate(undefined);
    }
  };

  const handleSendMethod = (e) => {
    const newValue = e.target.value;
    console.log(newValue);
    setSendMethod(newValue);
  };
  function displaySendmethod(newValue: string) {
    if (newValue == "Batch") {
      return (
        <>
          <div>
            <label htmlFor="sendDate" className="form-label">
              Start Time
            </label>
            <input
              id="sendDate"
              className="form-control"
              type="datetime-local"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="BatchSize" className="form-label">
              Batch Size
            </label>
            <input
              id="BatchSize"
              className="form-control"
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="IntervalMinutes" className="form-label">
              Interval Minutes
            </label>
            <input
              id="IntervalMinutes"
              className="form-control"
              type="number"
              value={intervalMinutes}
              onChange={(e) => setIntervalMinutes(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="timeWindowStart" className="form-label">
              Time Window Start
            </label>
            <input
              id="timeWindowStart"
              className="form-control"
              type="time"
              value={timeWindowStart}
              onChange={(e) => setTimeWindowStart(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="timeWindowEnd" className="form-label">
              Time Window End
            </label>
            <input
              id="timeWindowEnd"
              className="form-control"
              type="time"
              value={timeWindowEnd}
              onChange={(e) => setTimeWindowEnd(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="isLastSendDate" className="form-label">
              is Last Send Date
            </label>
            <input
              type="checkbox"
              id="isLastSendDate"
              className="form-control"
              checked={isLastSendDate}
              onChange={handleChecked}
            />
          </div>
          <div>{displayLastSendDate(isLastSendDate)}</div>
        </>
      );
    } else if (newValue == "Scheduled") {
      return (
        <div>
          <label htmlFor="sendDate" className="form-label">
            Start Time
          </label>
          <input
            id="sendDate"
            className="form-control"
            type="datetime-local"
            value={sendDate}
            onChange={(e) => setSendDate(e.target.value)}
            required
          />
        </div>
      );
    }
    return <></>;
  }
  function displayLastSendDate(newValue: boolean) {
    if (newValue) {
      return (
        <div>
          <label htmlFor="lastSendDate" className="form-label">
            Last Send Date
          </label>
          <input
            id="lastSendDate"
            className="form-control"
            type="datetime-local"
            value={lastSendDate}
            onChange={(e) => setLastSendDate(e.target.value)}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }
  const getFilledColumns = async () => {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const usedRange = sheet.getUsedRange();
      usedRange.load("values,columnCount");

      await context.sync();

      const filledColumns = [];
      const allValues = usedRange.values;

      for (let col = 0; col < usedRange.columnCount; col++) {
        const colValues = allValues.map(row => row[col]);
        const hasData = colValues.some(value => value !== null && value !== "");

        if (hasData) {
          filledColumns.push({
            value: col.toString(),
            label: `Sütun ${String.fromCharCode(65 + col)}`,
          });
        }
      }
      setValues(allValues);
      return filledColumns;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sendMethod) {
      setSendMethodError("Please select a send method.");
      return;
    }
    const payload = {
      sendMethod,
      isLastSendDate,
      lastSendDate,
      messageContent: {
        messageInput,
        recipients: recipients.map((r) => ({
          phoneNumber: r.phoneNumber,
          sendDate: sendDate,
        })),
      },
      batchSetting: {
        batchSize,
        intervalMinutes,
        timeWindowStart,
        timeWindowEnd,
      },
    };
    try {
      console.log(JSON.stringify(payload, null, 1));
      await send(payload);
      console.log("Data sent successfully.");
    } catch (error) {
      console.log(payload);
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.topRow}>
          <div className={styles.leftColumn}>
            <Field>
              <label htmlFor="MessageInput" className={styles.label}>
                Message Input
              </label>
              <Textarea
                id="MessageInput"
                className={styles.messageArea}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                required
              />
            </Field>
            
          </div>
          <div className={styles.rightColumn}>
              <div>SMS Sayısı: 1</div>
              <div>Son Ek: B043</div>
              <div>Karakter Uzunluğu: {text.length}</div>

              {/* kişiselleşti-önizleme  */}
              <Button
                label={"Kişiselleştir"}
                type="TERTIARY"
                // onClick={()=>setIsCustomizeOpen(true)}
                onClick={() => console.log("Helloo")}
              />

              <Button
                label={"Önizleme"}
                type="TERTIARY"
                onClick={() => {
                  // önce alıcı seçilmesi için
                  if (!recipients[0]) {
                    setErrorMessage("Lütfen önce alıcıyı seçiniz.");
                    return;
                  }
                  setErrorMessage("");
                  //setIsPreviewOpen(true)
                }}
              />
              {errorMessage && (
                <MessageBar intent="error" style={{ marginTop: "10px" }}>
                  {errorMessage}
                  <MessageBarActions onClick={() => setErrorMessage("")}>Kapat</MessageBarActions>
                </MessageBar>
              )}
            </div>
        </div>
        {usedColumns.length > 0 && (
          <div>
            <label htmlFor="columnSelect">Select Phone Number Column</label>
            <select
              id="columnSelect"
              value={selectedColumn}
              onChange={(e) => {
                const selectedValue = e.target.value;
                console.log("Selected column:", selectedValue);
                setSelectedColumn(selectedValue);
                const index = usedColumns.findIndex((col) => col === selectedValue);
                setUsedNumColumns(colNum[index]);
                setText("phoneNumber");
              }}
              onClick={handleReadColumn}
              required
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
        <div className={styles.bottomRow}>
          <div className={styles.leftColumn}>
          <Itemselector
            label={"Gönderim Şekli"}
            selectedValue={sendType}
            onChange={(value) => {
              setSendType(value);
              if (value !== "SonGönderimTarihiBelirle") {
                setShowFinalDate(false);
              }
            }}
            optionList={sendOptions}
            placeholder="Seçiniz"
          />
          </div>
          <div className={styles.rightColumn}>
            <Itemselector
              label={"Kime"}
              selectedValue={recipient}
              onChange={(value) => setRecipient(value)}
              optionList={columns}
              placeholder={"Sütun seçin"}
              className={styles.kimeDropdown}

            />
          </div>
        </div>

        

        <div>{displaySendmethod(sendMethod)}</div>

        <div>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
};
export default Send;
