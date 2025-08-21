import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";

interface ReadSelectedAreaProps {
    readSelectedArea:()=> Promise<string>;
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

const ReadSelectedArea:React.FC<ReadSelectedAreaProps> = (props) => {
  const [selectedText, setSelectedText] = useState("");

  const handleReadSelectedText = async () => {
    const text = await props.readSelectedArea();
    setSelectedText(text);
    
  };

  

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleReadSelectedText}>
        Insert text
      </Button>
      {selectedText && (
        <Textarea className={styles.textAreaField} value={selectedText} readOnly />
      )}     
    </div>
    
  );
};



export default ReadSelectedArea;
