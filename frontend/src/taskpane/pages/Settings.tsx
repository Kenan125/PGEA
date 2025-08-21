import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
//import "../style/style.css";
import { Radio, RadioGroup } from "@fluentui/react-components";
import { useStyles } from "../style/useStyle";


const Settings = ({ formik }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  
  const charoptions = [
    { value: "UTF-8", label: "Latin" },
    { value: "UTF-16", label: "Unicode" },
    { value: "ISO-8859-9", label: "Türkçe" },
  ];
  return (
    <div>
      <div className={classes.container}>
        <label className={classes.title}>Ayarlar</label>
        <div className={classes.charSet}>
          <RadioGroup
          id="Encoding"
          value={formik.values.Encoding}
          onChange={(_, data) => {formik.setFieldValue("Encoding", data.value);
          setInLocalStorage("Encoding", data.value);}}
        >
          {charoptions.map((option) => (
            <Radio key={option.value} value={option.value} label={option.label} />
          ))}
        </RadioGroup>
          
        </div>
        

        <div className={classes.buttonRow}>
          <Button id={"geri"} label={"Geri"} onClick={() => navigate(-1)} type="SECONDARY" />
          <Button id={"tamam"} label={"Tamam"} onClick={() => navigate("/")} type="MAIN" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
function setInLocalStorage(key: string, value: string) {
  const myPartitionKey = Office.context.partitionKey;
  console.log("myPartitionKey:", myPartitionKey);

  // Check if local storage is partitioned. 
  // If so, use the partition to ensure the data is only accessible by your add-in.
  if (myPartitionKey) {
    localStorage.setItem(myPartitionKey + key, value);
  } else {
    localStorage.setItem(key, value);
  }
}
export function getFromLocalStorage(key: string) {
  const myPartitionKey = Office.context.partitionKey;

  // Check if local storage is partitioned.
  if (myPartitionKey) {
    return localStorage.getItem(myPartitionKey + key);
  } else {
    return localStorage.getItem(myPartitionKey +key);
  }
}

