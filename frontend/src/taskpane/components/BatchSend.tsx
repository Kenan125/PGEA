import React, { useState } from "react";
import { readSelectedArea } from "../readselectedarea";
import { batchSend } from "../batchsend";
import { send } from "../send";
import "../style.css";

const BatchSend = () => {
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string; sendDate: string }>>(
    []
  );
  const [isLastSendDate, setIsLastSendDate] = useState<boolean>(false);
  const [lastSendDate, setLastSendDate] = useState<string>();
  const [messageInput, setMessageInput] = useState<string>("");
  const [sendDate, setSendDate] = useState<string>("");
  const [batchSize, setBatchSize] = useState<number>(0);
  const [intervalMinutes, setIntervalMinutes] = useState<number>(0);
  const [timeWindowStart, setTimeWindowStart] = useState<string>("");
  const [timeWindowEnd, setTimeWindowEnd] = useState<string>("");

  const handleGetNumber = async () => {
    try {
      const result = await readSelectedArea();
      const parsed = JSON.parse(result);
      setRecipients(parsed);
    } catch (error) {
      console.error("Error reading Excel data:", error);
    }
  };
  const handleChecked = (e) => {
    const newValue = e.target.checked;
    setIsLastSendDate(newValue);

    if (!newValue) {
      setLastSendDate(undefined);
    }
  };
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
      sendMethod: 2,
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
      <div className="container">
        <div className="infoRow">Mesajlarınız aşağıdaki değerlere göre parçalanacaktır.</div>
        <div className="dateRow">
          <label className="label">Başlangıç Tarihi</label>
          <input
            id="sendDate"
            className="form-control"
            type="datetime-local"
            value={sendDate}
            onChange={(e) => setSendDate(e.target.value)}
            required
          />
        </div>
        <div className="intervalMinutes">
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
          <div className="batchSize">
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
          <div className="timeRestrictions">
            <div className="start">
            <label className="label" htmlFor="timeWindowStart">Başlangıç</label>
            <input
              id="timeWindowStart"
              className="form-control"
              type="time"
              value={timeWindowStart}
              onChange={(e) => setTimeWindowStart(e.target.value)}
              required
            />
            </div>
            <div className="end">
              
            </div>
          </div>
        </div>
      </div>

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
      <div></div>
      <div></div>
      <div>
        <label htmlFor="sendDate" className="form-label">
          Start Time
        </label>
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

      <div>
        <label htmlFor="timeWindowStart" className="form-label">
          Time Window Start
        </label>
        
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
        <button type="button" onClick={handleGetNumber}>
          Load Phone Numbers from Excel
        </button>
      </div>

      <div>
        <strong>Loaded numbers:</strong>
        <ul>
          {recipients.map((p, i) => (
            <li key={i}>{p.phoneNumber}</li>
          ))}
        </ul>
      </div>
      <div>
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
};
export default BatchSend;
