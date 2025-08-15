import { useCallback } from "react";
import { format } from "date-fns";
import { replacePlaceholders } from "../utils/replacePlaceholders";
import { FormikHelpers } from "formik";
import { initialValues } from "../interfaces/initialValues";



export function onSubmit() {
  const handleSubmit = async (values: initialValues, { setSubmitting,resetForm }: FormikHelpers<initialValues>, ) => {
    const sendDate =
      values.sendMethod === "Hemen Gönder"
        ? format(new Date(), "yyyy-MM-dd'T'HH:mm")
        : values.sendDate;

    const payloadRecipients = values.recipients.map((recipient: any) => ({
      phoneNumber: recipient.phoneNumber,
      sendDate: values.sendMethod === "Sütundaki Tarihe Gönder" ? recipient.sendDate : sendDate,
      messageInput: replacePlaceholders(values.messageInput, recipient),
    }));

    const payload = {
      sendMethod: values.sendMethod,
      isLastSendDate: values.isLastSendDate,
      lastSendDate: values.lastSendDate,
      messageContent: { recipients: payloadRecipients },
      batchSetting: {
        batchSize: values.batchSize,
        intervalMinutes: values.intervalMinutes,
        timeWindowStart: values.timeWindowStart,
        timeWindowEnd: values.timeWindowEnd,
      },
    };

    try {
      console.log("payload:", JSON.stringify(payload, null, 2));
      //await send(payload);
      resetForm();
      
      
      
      
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Check console.");
      
    } finally {
      setSubmitting(false);
      

    }
  };

  return { handleSubmit };
}
