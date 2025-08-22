import { format } from "date-fns";
import { replacePlaceholders } from "../utils/replacePlaceholders";
import { FormikHelpers } from "formik";
import { initialValues } from "../interfaces/initialValues";

export function onSubmit() {
  
  const handleSubmit = async (
    values: initialValues,
    { setSubmitting, resetForm, setStatus }: FormikHelpers<initialValues>
  ) => {
    const sendDate =
      values.sendMethod === "Hemen Gönder"
        ? format(new Date(), "yyyy-MM-dd'T'HH:mm")
        : values.sendDate;

    const payloadRecipients = values.recipients.map((recipient: any) => ({
      phoneNumber: recipient.phoneNumber,
      sendDate: values.sendMethod === "Sütundaki Tarihe Gönder" ? recipient.sendDate : sendDate,
      messageInput: replacePlaceholders(values.messageInput, recipient),
    }));

    let payload = {
      Encoding: values.Encoding,
      sendMethod: values.sendMethod,
      isLastSendDate: values.isLastSendDate,
      lastSendDate: values.lastSendDate,
      messageContent: { recipients: payloadRecipients },
      batchSetting: {},
    };
    if(values.sendMethod === "Parçalı Gönder"){
      payload = {
        ...payload,
        batchSetting: {
        batchSize: values.batchSize,
        intervalMinutes: values.intervalMinutes,
        timeWindowStart: values.timeWindowStart,
        timeWindowEnd: values.timeWindowEnd,
      },
      }
    }

    try {
      
      console.log("payload:", JSON.stringify(payload, null, 2));

      
      //await send(payload);
      setStatus("success");
      
      
    } catch (error) {
      console.error("Error sending data:", error);

      
    } finally {
      setSubmitting(false);
      setTimeout(() => {
      resetForm();

      }, 500); 
      
    }
  };

  return { handleSubmit };
}
