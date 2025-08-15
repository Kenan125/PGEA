import React from "react";

const Scheduled = ({ formik }) => {
  return (
    <div className="scheduled-container">
      <label className="title">İleri Tarihte Gönderim</label>
      
      <div className="scheduled-content">
        
          <label htmlFor="sendDate" className="form-label">
            Gönderim Tarihi ve Saati
          </label>
          <input
            id="sendDate"
            className="form-control"
            type="datetime-local"
            value={formik.values.sendDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        
        
      </div>
      {formik.touched.sendDate && formik.errors.sendDate && (
          <div className="error">{formik.errors.sendDate}</div>
        )}
    </div>
  );
};

export default Scheduled;
