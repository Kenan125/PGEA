import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from '@fluentui/react-components'
import React from 'react'

const ConfirmForm = ({formik}) => {
    console.log(formik)
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open Alert dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Alert dialog title</DialogTitle>
          <DialogContent>
            {Object.entries(formik.values).map(([field, value]) => (
    <p key={field}>
      <strong>{field}:</strong> {String(value)}
    </p>
  ))}
          </DialogContent>
          <DialogActions>
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default ConfirmForm