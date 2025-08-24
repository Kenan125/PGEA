import { Dropdown, Label, Option, Tab, TabList } from "@fluentui/react-components";
import React from "react";
import { Form } from "react-router-dom";
import FormikErrors from "./formikErrors";
const SendMethod = ({formik, classes,options}) => {
    return(
        <>
        <div className={classes.leftColumn}>
                {/* Gönderim Şekli */}
                <Label id="label" htmlFor="sendMethod"></Label>
                <TabList
                  id="sendMethod"
                  selectedValue={formik.values.sendMethod}
                  onTabSelect={(_, data) => formik.setFieldValue("sendMethod", data.value)}
                  onBlur={formik.handleBlur}
                  appearance="filled-circular"
                >
                  {options.map((option) => (
                    <Tab key={option} value={option}>
                      {option}
                    </Tab>
                  ))}
                </TabList>
                <FormikErrors formik={formik} field={"sendMethod"} classes={classes} />
              </div>
        </>
    )
}
export default SendMethod;