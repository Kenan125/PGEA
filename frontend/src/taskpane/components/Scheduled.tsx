import React from 'react'

const Scheduled = ({formik}) => {
  return (
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
      );
}

export default Scheduled