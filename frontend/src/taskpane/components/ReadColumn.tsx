import React, { useEffect, useState } from "react";
import { readSelectedArea } from "../readselectedarea";

import { format } from "date-fns";
import { listNumUsedColumns } from "../listnumusedColumns";
import { readColumn } from "../ReadColumn";
import { listUsedcolumns } from "../listusedcolumns";



const ReadColumn = () => {
  const today: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string; sendDate: string }>>([]);
  const [usedColumns, setUsedColumns] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>();
  const [colNum,setColNum]=useState<number[]>([]);
  const [usedNumColumns, setUsedNumColumns] = useState<number | undefined>();
  const[text,setText] =useState<string>("")
  useEffect(() => {
    handleListUsedColumns();
  }, []);
  const handleListUsedColumns = async () => {
    const list = await listUsedcolumns();   
    setUsedColumns(list.columnLetters);
    setColNum(list.columnNum);
  };

  const handleReadColumn = async () => {
    await readColumn(usedNumColumns);
  }

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
    const payload = {
      messageContent: {
        recipients: recipients.map((r) => ({
          phoneNumber: r.phoneNumber,
        })),
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
              setText("phoneNumber")
        
            }}
          >
            <option value="" disabled>
              Select a column
            </option>
            {usedColumns.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>
        </>
      )}
      

      <div>
        <button type="button" onClick={handleGetNumber}>
          Load Phone Numbers from Excel
        </button>
      </div>
      <div>
        <button type="button" onClick={handleReadColumn}>
          Num
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
export default ReadColumn;
