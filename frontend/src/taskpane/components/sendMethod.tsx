import { Dropdown, Label, Option } from "@fluentui/react-components";
import React from "react";
import { Form } from "react-router-dom";
import FormikErrors from "./formikErrors";
const SendMethod = ({formik, classes,options}) => {
    return(
        <>
        <div className={classes.leftColumn}>
                {/* Gönderim Şekli */}
                <Label id="label" htmlFor="sendMethod"></Label>
                <Dropdown
                  id="sendMethod"
                  value={formik.values.sendMethod}
                  onOptionSelect={(_, data) => formik.setFieldValue("sendMethod", data.optionValue)}
                  onBlur={formik.handleBlur}
                  placeholder="Gönderim Şekli"
                >
                  {options.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Dropdown>
                <FormikErrors formik={formik} field={"sendMethod"} classes={classes} />
              </div>
        </>
    )
}
export default SendMethod;