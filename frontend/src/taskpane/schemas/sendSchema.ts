import { format } from "date-fns";
import * as yup from "yup";
const today = format((new Date()), "yyyy-MM-dd'T'HH:mm");
export const sendSchema = yup.object().shape({
  
  sendMethod: yup
    .string()
    .oneOf(["Hemen Gönder", "İleri Tarihte Gönder", "Parçalı Gönder", "Sütundaki Tarihe Gönder"]) 
    .required("Please select send method"),
  isLastSendDate: yup.boolean(),
  lastSendDate: yup.date().when("isLastSendDate", {
    is: true,
    then: (schema) => schema.required("Must enter last send date").min(yup.ref('sendDate'), 'Last send date cannot be earlier than start date'),
    otherwise: (schema) => schema,
  }),
  messageInput: yup.string().required("Mesajınızı Giriniz"),
  recipients: yup
    .array()
    .of(
      yup.object().shape({
        phoneNumber: yup.string().required("Phone number required"),
        sendDate: yup.string().nullable(),
      })
    ),
    batchSize: yup.number().when("sendMethod", {
    is: "Parçalı Gönder",
    then: (schema) => schema.required("Parça Sayısını Giriniz").min(1,"Parça sayısı 0'dan büyük olmalı."),
    otherwise: (schema) => schema,
  }),
  intervalMinutes: yup.number().when("sendMethod", {
    is: "Parçalı Gönder",
    then: (schema) => schema.required("Must enter interval minutes").min(1,"Interval Minutes must be greater than 0"),
    otherwise: (schema) => schema,
  }),
  timeWindowStart: yup.string().when("sendMethod", {
    is: "Parçalı Gönder",
    then: (schema) => schema.required("Must select start time window"),
    otherwise: (schema) => schema,
  }),
  timeWindowEnd: yup.string().when("sendMethod", {
    is: "Parçalı Gönder",
    then: (schema) => schema.required("Must select end time window"),
    otherwise: (schema) => schema,
  }),
  sendDate: yup.date().when("sendMethod", {
    is: (val:string)=> val=== "İleri Tarihte Gönder" || val === "Parçalı Gönder" || val==="Sütundaki Tarihe Gönder", 
    then: (schema) => schema.required("Tarih ve Saat Seçiniz").min( today, "Send date cannot be less than current date and time"),
    otherwise: (schema) => schema,
  }),
  time: yup.string().when("sendMethod",{
    is: "Sütundaki Tarihe Gönder",
    then: (schema)=> schema.required("Select time"),
    otherwise: (schema)=>schema,
  })
  
  

});