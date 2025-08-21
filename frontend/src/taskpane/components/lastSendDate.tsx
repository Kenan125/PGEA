import { Input, Label } from "@fluentui/react-components";
import React from "react";
const LastSendDate = ({formik, classes}) => { 
    return (
        <>
        {formik.values.isLastSendDate && (
            <div className={classes.lastSendDate}>
              <Label htmlFor="lastSendDate" className={classes.checkboxLabel}>
                Son Gönderim Tarihi
              </Label>
              <Input              
                id="lastSendDate"
                className={classes.checkboxFormControl}
                type="datetime-local"
                value={formik.values.lastSendDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          )}
          {formik.touched.lastSendDate && formik.errors.lastSendDate && (
            <div className={classes.error}>{formik.errors.lastSendDate}</div>
          )}
        </>
    )
}
export default LastSendDate;