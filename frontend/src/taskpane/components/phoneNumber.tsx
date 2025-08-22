import { Dropdown, Option } from "@fluentui/react-components";
import React from "react";
import FormikErrors from "./formikErrors";
const PhoneNumber = ({ formik, classes, handleColumnSelect,usedColumns }) => {
    return(
        <>
        <div className={classes.rightColumn}>
                {/* Alıcı */}
                <label id="label" htmlFor="phoneNumberColumn">
                  Alıcı
                </label>
                <div className={classes.phoneNumberColumn}>
                  <Dropdown
                    id="phoneNumberColumn"
                    name="selectedPhoneNumberColumn"
                    value={formik.values.selectedPhoneNumberColumn}
                    onOptionSelect={(_event, data) => {
                      handleColumnSelect(
                        "selectedPhoneNumberColumn",
                        data.optionValue,
                        "phoneNumber"
                      );
                    }}
                    onBlur={formik.handleBlur}
                    placeholder="Alıcı Sütunu"
                  >
                    {usedColumns.map((col, index) => (
                      <Option key={index} value={col}>
                        {col}
                      </Option>
                    ))}
                  </Dropdown>
                </div>
                {formik.touched.recipients?.[0]?.phoneNumber &&
                  formik.errors.recipients?.[0]?.phoneNumber && (
                    <div style={{ color: "red", marginTop: "4px" }}>
                      {formik.errors.recipients[0].phoneNumber}
                    </div>
                  )}

                <FormikErrors formik={formik} field={"selectedPhoneNumberColumn"} classes={classes} />
              </div>
        </>
    )
}
export default PhoneNumber;