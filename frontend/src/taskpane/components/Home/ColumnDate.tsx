import React from "react";

const ColumnDate = ({ formik,usedColumns,handleColumnSelect, classes }) => {
  return (
    <>
    <div className={classes.containerColumnDate}>
      <label className={classes.title}>Sütundaki Tarihe Gönderim</label>
      <p className={classes.lblDark}>
          Lütfen mesajların her biri için tarih değerlerini içeren sütunu seçin.
        </p>
        <p className="lbl-light">
          Mesajların her biri ilgili tarihte teslim edilecektir.<br />
          Tarihlerin gg/aa/yyyy biçiminde olması gerektiğini unutmayın.
        </p>
        <div className={classes.timeRow}>
        <label htmlFor="time" className={classes.formLabel}>
          Gönderim Zamanı
        </label>
        <input
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
          <label id="label" htmlFor="sendDateColumn">Tarih Sütunu Seçiniz</label>
        <select
          disabled={formik.errors.time}
          id="sendDateColumn"
          className={classes.formControl}
          name="selectedSendDateColumn"
          value={formik.values.selectedSendDateColumn}          
          onChange={(e)=>handleColumnSelect("selectedSendDateColumn", e.target.value,"sendDate",formik.values.time)}
          onBlur={formik.handleBlur}          
          
        >
          <option label="Select a column" value="" disabled />
          {usedColumns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}         
        </select>        
        </div>

      )}  
              
      </>

  );
};

export default ColumnDate;
