import React from "react";

const ColumnDate = ({ formik, usedColumns, handleColumnSelect }) => {
  return (
    <>
      <div>
        <label htmlFor="time" className="form-label">
          Time at selected Date
        </label>
        <input
          id="time"
          className="form-control"
          type="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.time && formik.errors.time && (
          <div style={{ color: "red" }}>{formik.errors.time}</div>
        )}
      </div>
      {formik.touched.time && !formik.errors.time && (
        <>
          {usedColumns.length > 0 && (
            <>
              <label htmlFor="sendDate">Select Send Date Column</label>
              <select
                id="sendDate"
                name="selectedSendDateColumn"
                value={formik.values.selectedSendDateColumn}
                onChange={(e) =>
                  handleColumnSelect(
                    "selectedSendDateColumn",
                    e.target.value,
                    "sendDate",
                    formik.values.time
                  )
                }
                onBlur={formik.handleBlur}
              >
                <option label="Select a column" value="" disabled />
                {usedColumns.map((col, index) => (
                  <option key={index} value={col}>
                    {col}
                  </option>
                ))}
              </select>
              {formik.touched.recipients && typeof formik.errors.recipients === "string" && (
                <div style={{ color: "red" }}>{formik.errors.recipients}</div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ColumnDate;
