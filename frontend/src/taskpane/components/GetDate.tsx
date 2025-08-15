import * as React from "react";
import { useState } from "react";
import {
  Button,
  Field,
  Textarea,
  tokens,
  makeStyles,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import { listUsedcolumns } from "../helpers/listusedcolumns";


interface GetDateProps {
  getDate: (range: number, time: string) => Promise<boolean>;
  
}

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
});

const GetDate: React.FC<GetDateProps> = (props: GetDateProps) => {
  const [text, setText] = useState(Number(0));
  const [selectedText, setSelectedText] = useState(Number);
  const [time, setTime] = useState(String(""));
  const [usedColumns, setUsedColumns] = useState<string[]>([]);

  const handleListUsedColumns = async () => {
    const list = await listUsedcolumns();
    setUsedColumns(list.columnLetters);
  };

  const handleReadSelectedText = async () => {   
    await props.getDate(text, time);
    setSelectedText(text);
    setTime(time);

  };
  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(Number(event.target.value));
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field
        className={styles.textAreaField}
        size="large"
        label="Enter text to be inserted into the Selected Area."
      >
        <Textarea size="large" value={String(text)} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>
        Click the button to insert text to the selected area.
      </Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleReadSelectedText}>
        Insert text
      </Button>
      <Button appearance="primary" disabled={false} size="large" onClick={handleListUsedColumns}>
        List Columns
      </Button>
      {usedColumns.length > 0 && (
        <Dropdown
          placeholder="Select a column"
          onOptionSelect={(event, data) => console.log("Selected:", data.optionValue, event.type)}
        >
          {usedColumns.map((col, index) => (
            <Option key={index} value={col}>
              {col}
            </Option>
          ))}
        </Dropdown>
      )}

      <div>
        <label htmlFor="startSendTime" className="form-label">
          Start Time
        </label>
        <input
          id="startSendTime"
          className="form-control"
          type="time"
          value={time}
          onChange={
            (e) => {
            setTime(e.target.value);           
            console.log(e.target.value);
          }}
          
          required
        />
      </div>
    </div>
  );
};

export default GetDate;
