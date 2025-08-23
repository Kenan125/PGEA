import { format } from "date-fns";
import * as yup from "yup";
const today = format((new Date()), "yyyy-MM-dd'T'HH:mm");
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const sendSchema = yup.object().shape({
  
  sendMethod: yup
    .string()
    .oneOf(["Hemen Gönder", "İleri Tarihte Gönder", "Parçalı Gönder", "Sütundaki Tarihe Gönder"]) 
    .required("Gönderim şeklini seçiniz"),
  isLastSendDate: yup.boolean(),
  lastSendDate: yup.date().when("isLastSendDate", {
    is: true,
    then: (schema) => schema.required("Son gönderim tarihini seçiniz").min(today, 'Son gönderim tarihi başlangıç tarihinden erken olamaz'),
    otherwise: (schema) => schema,
  }),

  messageInput: yup.string().max(160,"karakter sayısı limiti 160'tır.").required("Mesajınızı Giriniz"),

  recipients: yup
    .array()
    .of(
      yup.object().shape({
        phoneNumber: yup.string().required("Alıcı Sütunu seçiniz"),
        sendDate: yup.date().when("sendMethod", {
          is:(val: string)=> val === "Sütundaki Tarihe Gönder",
          then: (schema) => schema.required("Must select send date column").min(today,"Gönderim tarihi bugünden erken olamaz"),      
    
        })
      })
    ),
    batchSize: yup.number().when("sendMethod", {
    is: "Parçalı Gönder",
    then: (schema) => schema.required("Parça Sayısını Giriniz").min(1,"Parça sayısı 0'dan büyük olmalı."),
    otherwise: (schema) => schema,
  }),
  intervalMinutes: yup.number().when("sendMethod", {
    is: "Parçalı Gönder",
    then: (schema) => schema.required("Parçalar arası süreyi giriniz").min(1,"Parçalar arası süre 0'dan büyük olmalıdır"),
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

    is: (val:string)=> val=== "İleri Tarihte Gönder" || val === "Parçalı Gönder",
    then: (schema) => schema.required("Tarih ve Saat Seçiniz").min( today, "Send date cannot be less than current date and time"),
    otherwise: (schema) => schema,
  }),
  time: yup.string().when("sendMethod",{
    is: "Sütundaki Tarihe Gönder",
    then: (schema)=> schema.required("Select time"),
    otherwise: (schema)=>schema,
  }),
  // selectedPhoneNumberColumn: yup
  // .string()
  // .required("Lütfen alıcı sütununu seçiniz"),

  
  

});