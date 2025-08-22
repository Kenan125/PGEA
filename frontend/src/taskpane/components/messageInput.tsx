import { Label, Textarea } from "@fluentui/react-components";
import React from "react";
import FormikErrors from "./formikErrors";
const MessageInput = ({formik, classes}) => {
    return (
        <>
        <div className={classes.leftColumn}>
                        <Label htmlFor="messageInput">Mesajınız</Label>
                        <Textarea
                          id="messageInput"
                          appearance="outline"
                          resize="vertical"
                          placeholder="Mesajınızı giriniz"
                          value={formik.values.messageInput}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <FormikErrors formik={formik} field={"messageInput"} classes={classes} />
                        
                      </div>


        </>
    );
}
export default MessageInput;