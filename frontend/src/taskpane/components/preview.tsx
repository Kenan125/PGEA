import { Button, mergeClasses } from "@fluentui/react-components";
import React from "react";
import { replacePlaceholders } from "../utils/replacePlaceholders";

const Preview = ({classes, formik, setIsPreviewOpen}) =>{
    return (
        <>
        <div className={classes.previewContainer}>
                    <div className={classes.nibIosTemplate}>
                      
                      <div className={classes.nibIosMessages}>
                        <div className={classes.nibIosTime}>
                          Mesajlar<br></br>
                        </div>
                        <div className={mergeClasses(classes.nibIosMsg, classes.nibReceived)}>Mesaj Önizlemesi</div>
                        <div className={mergeClasses(classes.nibIosMsg, classes.nibSent)}>
                          {formik.values.messageInput
                            ? replacePlaceholders(formik.values.messageInput, formik.values.recipients[0])
                            : "Boş Mesaj"}
                        </div>
                      </div>
                    </div>
                    <div className={classes.previewButton}>
                      <Button
                        id={"kapat"}
                        //label={"Kapat"}
                        onClick={() => setIsPreviewOpen(false)}
                        type="button"
                      >
                        Kapat
                      </Button>
                    </div>
                  </div>
        </>
    )
}
export default Preview;