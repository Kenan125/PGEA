import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";

interface InsertTextToSelectionProps {
  insertSelectedArea: (text: string) => Promise<boolean>;
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

const InsertTextToSelection:React.FC<InsertTextToSelectionProps> = (props) => {
  const [text, setText] = useState("Some text.");
  const [status, setStatus] = useState<string | null>(null);

  const handleTextInsertion = async () => {
    const result = await props.insertSelectedArea(text);
    if (result) {
    setStatus("Text inserted successfully!");
  } else {
    setStatus("Failed to insert text.");
  }
  };

  const handleTextChange = async (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the Selected Area.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text to the selected area.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button> 
      {status && <Field className={styles.instructions}>{status}</Field>}
      <Field className={styles.instructions}/>    
    </div>
    
  );
};


export default InsertTextToSelection;
