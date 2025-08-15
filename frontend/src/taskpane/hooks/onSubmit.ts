import { useCallback } from "react";
import { format } from "date-fns";
import { replacePlaceholders } from "../helpers/replacePlaceholders";



export function onSubmit(send: (payload: any) => Promise<void>) {
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const sendDate =
      values.sendMethod === "Hemen Gönder"
        ? format(new Date(), "yyyy-MM-dd'T'HH:mm")
        : values.sendDate;

    const payloadRecipients = values.recipients.map((recipient: any) => ({
      phoneNumber: recipient.phoneNumber,
      sendDate: values.sendMethod === "ColumnDate" ? recipient.sendDate : sendDate,
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
      await send(payload);
      alert("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return { handleSubmit };
}
