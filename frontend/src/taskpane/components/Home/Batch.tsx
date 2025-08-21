import React from "react";
import SendDate from "../sendDate";
import { Input, Label } from "@fluentui/react-components";
import { TimePicker } from "@fluentui/react-timepicker-compat";

const Batch = ({ formik, classes }) => {
  return (
    <>
   
      <div className={classes.containerBatch}>
        <Label required className={classes.title}>Parçalı Gönderim</Label>
        <div className={classes.infoRow}>Mesajlarınız aşağıdaki değerlere göre parçalanacaktır.</div>
        <div className={classes.dateRow}>
          <SendDate formik={formik} classes={classes} />          
        </div>
        
        <div className={classes.intervalMinutes}>
          <Label required htmlFor="intervalMinutes" className={classes.formLabel}>
            Parçalar Arası Süre
          </Label>
          <Input
            id="intervalMinutes"
            className={classes.formControl}
            type="number"
            value={formik.values.intervalMinutes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />
          
        </div>
        {formik.touched.intervalMinutes && formik.errors.intervalMinutes && (
            <div className={classes.error}>{formik.errors.intervalMinutes}</div>
          )}
        <div className={classes.batchSize}>
          <Label required htmlFor="batchSize" className={classes.formLabel}>
            Her Bölümdeki Mesaj Sayısı
          </Label>
          <Input
            id="batchSize"
            className={classes.formControl}
            type="number"
            
            value={formik.values.batchSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
        </div>
        {formik.touched.batchSize && formik.errors.batchSize && (
            <div className={classes.error}>{formik.errors.batchSize}</div>
          )}
        <div className={classes.timeRestrictions}>
          <p style={{ marginBottom: "0px" }}>Gönderme İşleminin Zaman Kısıtlamaları</p>
          <p style={{ color: "#8f8f8f", marginTop: "0px", marginBottom: "30px" }}>
            Eğer bir kısım kısıtlamlar dahilinde tamamlanamıyorsa ertesi gün başlangıç saatinde
            iletilecektir.{" "}
          </p>
        </div>
        <div className={classes.timeRow}>
          
            <div className={classes.start}>
            <Label required htmlFor="timeWindowStart" className={classes.formLabel}>
              Başlangıç
            </Label>
            <Input
              id="timeWindowStart"
              className={classes.formControl}
              type="time"
              value={formik.values.timeWindowStart}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            </div>
            {formik.touched.timeWindowStart && formik.errors.timeWindowStart && (
              <div style={{ color: "red" }}>{formik.errors.timeWindowStart}</div>
            )}
          
          <div className="end">
            <Label required htmlFor="timeWindowEnd" className={classes.formLabel}>
              Bitiş
            </Label>
            <Input
              id="timeWindowEnd"
              className={classes.formControl}
              type="time"
              value={formik.values.timeWindowEnd}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            </div>
            {formik.touched.timeWindowEnd && formik.errors.timeWindowEnd && (
              <div style={{ color: "red" }}>{formik.errors.timeWindowEnd}</div>
            )}
          </div>
        </div>                  
    </>
  );
};

export default Batch;
