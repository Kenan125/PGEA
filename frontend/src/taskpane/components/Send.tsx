import React, { useEffect, useState } from "react";
import { readSelectedArea } from "../readselectedarea";
import { send } from "../send";

import { format } from "date-fns";
import { listUsedcolumns } from "../listusedcolumns";
import { readColumn } from "../ReadColumn";



const Send = () => {
  
  const today:string = format((new Date()), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string; sendDate: string }>>(
    []
  );
  const [sendMethod, setSendMethod] = useState<number>();
  const [isLastSendDate, setIsLastSendDate] = useState<boolean>(false);
  const [lastSendDate, setLastSendDate] = useState<string>();
  const [messageInput, setMessageInput] = useState<string>("");
  const [sendDate, setSendDate] = useState<string>(today);
  const [batchSize, setBatchSize] = useState<number>(0);
  const [intervalMinutes, setIntervalMinutes] = useState<number>(0);
  const [timeWindowStart, setTimeWindowStart] = useState<string>("");
  const [timeWindowEnd, setTimeWindowEnd] = useState<string>("");
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [usedNumColumns, setUsedNumColumns] = useState<number | undefined>();
  const [colNum,setColNum]=useState<number[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const[text,setText] =useState<string>("")
  useEffect(() => {
    handleListUsedColumns();
    
    
  }, []);
  const handleListUsedColumns = async () => {
    const list = await listUsedcolumns();
    setUsedColumns(list.columnLetters);
    setColNum(list.columnInfo);
  };
  const handleReadColumn = async () => {
      const result = await readColumn(usedNumColumns,text);
      const parsed = JSON.parse(result);
      setRecipients(parsed);
    }
  
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
  function displaySendmethod(newValue: number) {
    if (newValue == 2) {
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
    } else if (newValue == 1) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      //await send(payload);
      console.log("Data sent successfully.");
    } catch (error) {
      console.log(payload);
      console.error("Error sending data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {usedColumns.length > 0 && (
        <>
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
            <option label="Select a column" value="" disabled/>                      
            {usedColumns.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>
        </>
      )}
      <label htmlFor="sendMethod" className="form-label">
        Select send Method
        <select
          id="sendMethod"
          className="form-control"
          value={sendMethod}
          onChange={handleSendMethod}
          required
        >
          <option label="Select"  disabled/> 
          <option value={0}>Send Now</option>
          <option value={1}>Send Scheduled</option>
          <option value={2}>Send Batches</option>
          <option value={3}> Send Column Date</option>
          
        </select>
        
      </label>
      <div>
        <label htmlFor="MessageInput" className="form-label">
          Message Input
        </label>
        <input
          id="MessageInput"
          className="form-control"
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          required
        />
      </div>
      <div>{displaySendmethod(sendMethod)}</div>

        
      <div>
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
};
export default Send;
