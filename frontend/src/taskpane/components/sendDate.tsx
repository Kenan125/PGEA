import { Input, Label } from '@fluentui/react-components';
import React from 'react';
const SendDate = ({formik ,classes}) => {
    return(
        <>
        <Label required htmlFor="sendDate" className={classes.formLabel}>
           Başlangıç Tarihi
          </Label>
          <Input
            id="sendDate"
            className={classes.formControl}
            type="datetime-local"
            value={formik.values.sendDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.sendDate && formik.errors.sendDate && (
          <div className={classes.error}>{formik.errors.sendDate}</div>
        )}
        </>
    );

};
export default SendDate;