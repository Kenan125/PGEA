import React from "react";

const Batch = ({ formik }) => {
  return (
    <>
   
      <div className="container-batch">
        <label className="title">Parçalı Gönderim</label>
        <div className="infoRow">Mesajlarınız aşağıdaki değerlere göre parçalanacaktır.</div>
        <div className="dateRow">
          <label htmlFor="sendDate" className="form-label">
            Başlangıç Tarihi
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
        <div className="intervalMinutes">
          <label htmlFor="intervalMinutes" className="form-label">
            Parçalar Arası Süre
          </label>
          <input
            id="intervalMinutes"
            className="form-control"
            type="number"
            value={formik.values.intervalMinutes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
        </div>
        {formik.touched.intervalMinutes && formik.errors.intervalMinutes && (
            <div className="error">{formik.errors.intervalMinutes}</div>
          )}
        <div className="batchSize">
          <label htmlFor="batchSize" className="form-label">
            Her Bölümdeki Mesaj Sayısı
          </label>
          <input
            id="batchSize"
            className="form-control"
            type="number"
            value={formik.values.batchSize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
        </div>
        {formik.touched.batchSize && formik.errors.batchSize && (
            <div className="error">{formik.errors.batchSize}</div>
          )}
        <div className="timeRestrictions">
          <p style={{ marginBottom: "0px" }}>Gönderme İşleminin Zaman Kısıtlamaları</p>
          <p style={{ color: "#8f8f8f", marginTop: "0px", marginBottom: "30px" }}>
            Eğer bir kısım kısıtlamlar dahilinde tamamlanamıyorsa ertesi gün başlangıç saatinde
            iletilecektir.{" "}
          </p>
        </div>
        <div className="timeRow">
            <div className="start">
            <label htmlFor="timeWindowStart" className="form-label">
              Başlangıç
            </label>
            <input
              id="timeWindowStart"
              className="form-control"
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
            <label htmlFor="timeWindowEnd" className="form-label">
              Bitiş
            </label>
            <input
              id="timeWindowEnd"
              className="form-control"
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
      
            {/* is last send date checkbox */}
      
    </>
  );
};

export default Batch;
