import React from "react";
import SendDate from "../sendDate";

const Scheduled = ({ formik ,classes }) => {
  return (
    <div className="scheduled-container">
      <label className={classes.title}>İleri Tarihte Gönderim</label>
      
      <div className={classes.scheduledContent}>
        
          <SendDate formik={formik} classes={classes} />
        
        
      </div>
      
    </div>
  );
};

export default Scheduled;
