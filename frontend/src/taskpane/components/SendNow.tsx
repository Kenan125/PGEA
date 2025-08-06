import React, { useState } from "react";
import { readSelectedArea } from "../readselectedarea";
import { useNavigate } from "react-router-dom";
import { send } from "../send";
import { endOfDay, format } from "date-fns";


const SendNow = () => {
  
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string}>>([]);
  
  
  const [messageInput, setMessageInput] = useState<string>("");
  
  
  const navigate = useNavigate();

  const handleGetNumber = async () => {
    try {
      const result = await readSelectedArea();
      const parsed = JSON.parse(result);
      setRecipients(parsed);
    } catch (error) {
      console.error("Error reading Excel data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const sendDate = new Date()
    const today = new Date(
      Date.UTC(
        Number(new Date().getFullYear()),
        Number(new Date().getMonth()),
        Number(new Date().getDate()),
        Number(new Date().getHours()),
        Number(new Date().getMinutes())
      )
    )
    
     //const today:string = format((new Date()), "yyyy-MM-dd'T'HH:mm:ss'Z'");
     console.log("hellof"+today);
    const payload = {
      sendMethod:0,
      messageContent: {
        messageInput,
        recipients: recipients.map((r) => ({
          phoneNumber: r.phoneNumber,
          sendDate:     new Date(today).toISOString(),
        })),
      },
      
    };

    try {
      
      //setSendDate(sendDate);
      
      await send(payload);
      console.log("Data sent successfully.");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <button title="Geri" type="button" onClick={() => navigate("/")}>
          Geri
        </button>
      </div>
    </form>
  );
};

export default SendNow;
