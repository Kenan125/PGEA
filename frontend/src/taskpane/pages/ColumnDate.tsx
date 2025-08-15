import React from "react";

const ColumnDate = ({ formik,usedColumns,handleColumnSelect }) => {
  return (
    <>
    <div className="container-columnDate">
      <label className="title">Sütundaki Tarihe Gönderim</label>
      <p className="lbl-dark">
          Lütfen mesajların her biri için tarih değerlerini içeren sütunu seçin.
        </p>
        <p className="lbl-light">
          Mesajların her biri ilgili tarihte teslim edilecektir.<br />
          Tarihlerin gg/aa/yyyy biçiminde olması gerektiğini unutmayın.
        </p>
      {usedColumns.length>0 &&(
        
        <div className="dateRow">
          <label id="label" htmlFor="sendDateColumn">Tarih Sütunu Seçiniz</label>
        <select
        
          id="sendDateColumn"
          className="form-control"
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
      <div className="timeRow">
        <label htmlFor="time" className="form-label">
          Gönderim Zamanı
        </label>
        <input
          id="time"
          className="form-control"
          type="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        
      </div> 
      {formik.touched.time && formik.errors.time && (
          <div className="error">{formik.errors.time}</div>
        )} 
      </div>          
      </>

  );
};

export default ColumnDate;
