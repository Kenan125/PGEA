import React from 'react';
const FormikErrors = ({ formik, field, classes }) => {
  return (
    <>
      {formik.touched[field] && formik.errors[field] && (
        <div className={classes.error}>{formik.errors[field]}</div>
      )}
    </>
  );
};
export default FormikErrors;