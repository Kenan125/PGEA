import { Input, Label } from '@fluentui/react-components';
import { Formik } from 'formik';
import React from 'react';
import FormikErrors from './formikErrors';
const SendDate = ({formik ,classes, htmlFor, value, label}) => {
    return(
        <>
        <Label required htmlFor={htmlFor} className={classes.formLabel}>
           {label}
          </Label>
          <FormikErrors formik={formik} field={htmlFor} classes={classes} />
          <Input
            id={htmlFor}
            className={classes.formControl}
            type="datetime-local"
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            
          />
          
        </>
    );

};
export default SendDate;