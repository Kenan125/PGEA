import React from "react";

const Batch = ({ formik }) => {
  return (
    <>
      <div>
        <label htmlFor="sendDate" className="form-label">
          Start Time
        </label>
        <input
          id="sendDate"
          className="form-control"
          type="datetime-local"
          value={formik.values.sendDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.sendDate && formik.errors.sendDate && (
          <div style={{ color: "red" }}>{formik.errors.sendDate}</div>
        )}
      </div>
      <div>
        <label htmlFor="batchSize" className="form-label">
          Batch Size
        </label>
        <input
          id="batchSize"
          className="form-control"
          type="number"
          value={formik.values.batchSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.batchSize && formik.errors.batchSize && (
          <div style={{ color: "red" }}>{formik.errors.batchSize}</div>
        )}
      </div>
      <div>
        <label htmlFor="intervalMinutes" className="form-label">
          Interval Minutes
        </label>
        <input
          id="intervalMinutes"
          className="form-control"
          type="number"
          value={formik.values.intervalMinutes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.intervalMinutes && formik.errors.intervalMinutes && (
          <div style={{ color: "red" }}>{formik.errors.intervalMinutes}</div>
        )}
      </div>
      <div>
        <label htmlFor="timeWindowStart" className="form-label">
          Time Window Start
        </label>
        <input
          id="timeWindowStart"
          className="form-control"
          type="time"
          value={formik.values.timeWindowStart}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.timeWindowStart && formik.errors.timeWindowStart && (
          <div style={{ color: "red" }}>{formik.errors.timeWindowStart}</div>
        )}
      </div>
      <div>
        <label htmlFor="timeWindowEnd" className="form-label">
          Time Window End
        </label>
        <input
          id="timeWindowEnd"
          className="form-control"
          type="time"
          value={formik.values.timeWindowEnd}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.timeWindowEnd && formik.errors.timeWindowEnd && (
          <div style={{ color: "red" }}>{formik.errors.timeWindowEnd}</div>
        )}
      </div>
      <div>
        <label htmlFor="isLastSendDate" className="form-label">
          is Last Send Date
        </label>
        <input
          type="checkbox"
          id="isLastSendDate"
          className="form-control"
          checked={formik.values.isLastSendDate}
          onChange={(e) => formik.setFieldValue("isLastSendDate", e.target.checked)}
        />
      </div>
      <div>
        {formik.values.isLastSendDate && (
          <>
            <label htmlFor="lastSendDate" className="form-label">
              Last Send Date
            </label>
            <input
              id="lastSendDate"
              className="form-control"
              type="datetime-local"
              value={formik.values.lastSendDate}
              onChange={formik.handleChange}
            />
            {formik.touched.lastSendDate && formik.errors.lastSendDate && (
              <div style={{ color: "red" }}>{formik.errors.lastSendDate}</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Batch;
