import { Label, Select } from '@fluentui/react-components';
import React from 'react'
const Customize = ({formik,classes,messageSelectRef,handleMessageInput,usedColumns}) => {
  return (
    <>
    
    <div className={classes.customize}>
                      <Label htmlFor="messageColumn" className={classes.label}>
                        Kişiselleştirmek İçin Sütun Seçin
                      </Label>
                      <Select
                        ref={messageSelectRef}
                        id="messageColumn"
                        name="messageInput"
                        value={formik.values.messageInput}
                        onChange={async (e) => {
                          const colLetter = e.target.value;
                          formik.setFieldValue("messageInput", colLetter);
                          await handleMessageInput(`Sutun_${colLetter}`, colLetter);
                          formik.setFieldValue(
                            "messageInput",
                            formik.values.messageInput + `{Sutun_${colLetter}}`
                          );
                        }}
                        onBlur={formik.handleBlur}
                      >
                        <option label="Sütun seçin" value="" disabled />
                        {usedColumns.map((col, index) => (
                          <option key={index} value={col}>
                            {col}
                          </option>
                        ))}
                      </Select>
                    </div>
    </>
  )
}

export default Customize