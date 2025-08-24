import { InfoLabel, Input, Label, Select } from "@fluentui/react-components";
import React from "react";

const ColumnDate = ({ formik,usedColumns,handleColumnSelect, classes }) => {
  return (
    <>
    <div className={classes.containerColumnDate}>
      <InfoLabel className={classes.title} size="large" info={"Lütfen mesajların her biri için tarih değerlerini içeren sütunu seçin. Mesajların her biri ilgili tarihte teslim edilecektir."}>
        Sütundaki Tarihe Gönderim
        </InfoLabel>
        <div className={classes.timeRow}>
        <Label htmlFor="time" className={classes.formLabel}>
          Gönderim Zamanı
        </Label>
        <Input
          id="time"
          className={classes.formControl}
          type="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        
      </div> 
      {formik.touched.time && formik.errors.time && (
          <div className={classes.error}>{formik.errors.time}</div>
        )} 
      </div>  
      {usedColumns.length>0 &&(        
        <div className={classes.dateRow}>
          <InfoLabel id="label" htmlFor="sendDateColumn" size="large" info={"Tarihlerin gg/aa/yyyy biçiminde olması gerektiğini unutmayın."}>
          Tarih Sütunu Seçiniz
          </InfoLabel>
        <Select
          disabled={formik.errors.time}
          id="sendDateColumn"
          className={classes.formControl}
          name="sendDateColumn"
          value={formik.values.sendDateColumn}          
          onChange={(e)=>handleColumnSelect("sendDateColumn", e.target.value,"sendDate",formik.values.time)}
          onBlur={formik.handleBlur}          
          
        >
          <option label="Select a column" value="" disabled />
          {usedColumns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}         
        </Select>        
        </div>

      )}  
              
      </>

  );
};

export default ColumnDate;
