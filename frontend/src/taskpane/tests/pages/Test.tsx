import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";


/* global HTMLTextAreaElement */

interface TestProps {
  highlightTest: () => Promise<boolean>;
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

const Test: React.FC<TestProps> = ({highlightTest}) => {
  

  const handleTextInsertion = async () => {
    const result = await highlightTest();
    console.log(result);
    
  };

  

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button>
    </div>
  );
};

export default Test;
