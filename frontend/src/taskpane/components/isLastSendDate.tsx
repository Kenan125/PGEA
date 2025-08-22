import { Switch } from '@fluentui/react-components';
import React from 'react'

const IsLastSendDate = ({formik,classes}) => {
  return (
    <>
    <div className={classes.checkbox}>
                  <Switch
                    type="checkbox"
                    id="isLastSendDate"
                    label={"Son Gönderim Tarihi Belirle"}
                    className={classes.formControl}
                    checked={formik.values.isLastSendDate}
                    onChange={(e) => {
                      formik.setFieldValue("isLastSendDate", e.target.checked);
                      if (!e.target.checked) {
                        formik.setFieldValue("lastSendDate", "");
                      }
                    }}
                  />
                </div>
    </>
  )
}

export default IsLastSendDate