import { useFormik } from "formik";
import { sendSchema } from "../schemas/sendSchema";
import { onSubmit } from "./onSubmit";
import { send } from "../send";
import { initialValues } from "../interfaces/initialValues";

export const useSendForm = () =>{
    const{handleSubmit} = onSubmit(async(payload)=>{
    send(payload)
  })

const formik = useFormik<initialValues>({
    initialValues: {
      selectedPhoneNumberColumn: "",
      selectedSendDateColumn: "",
      selectedMessageInput: "",
      sendMethod: "",
      isLastSendDate: false,
      lastSendDate: "",
      messageInput: "",
      recipients: [],

      sendDate: "",
      batchSize: 0,
      intervalMinutes: 0,
      timeWindowStart: "09:30",
      timeWindowEnd: "18:00",
      time: "",
    },
    validationSchema: sendSchema,
    onSubmit: handleSubmit,
  });
  return {formik};
}
