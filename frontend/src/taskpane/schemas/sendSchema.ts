import { format } from "date-fns";
import * as yup from "yup";
export const sendSchema = yup.object().shape({
  test: yup.boolean(),
  sendMethod: yup
    .string()
    .oneOf(["Now", "Scheduled", "Batch", "ColumnDate"]) // corrected oneOf
    .required("Please select send method"),
  isLastSendDate: yup.boolean(),
  lastSendDate: yup.date().when("isLastSendDate", {
    is: true,
    then: (schema) => schema.required("Must enter last send date").min(yup.ref('sendDate'), 'Last send date cannot be earlier than start date'),
    otherwise: (schema) => schema,
  }),
  messageInput: yup.string().required("Please enter message"),
  recipients: yup
    .array()
    .of(
      yup.object().shape({
        phoneNumber: yup.string().required("Phone number required"),
        sendDate: yup.string().nullable(),
      })
    )
    .min(1, "Please select a column to load recipients"),
    batchSize: yup.number().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Must enter batch size").min(1,"Batch size must be greater than 0"),
    otherwise: (schema) => schema,
  }),
  intervalMinutes: yup.number().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Must enter interval minutes").min(1,"Interval Minutes must be greater than 0"),
    otherwise: (schema) => schema,
  }),
  timeWindowStart: yup.string().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Must select start time window"),
    otherwise: (schema) => schema,
  }),
  timeWindowEnd: yup.string().when("sendMethod", {
    is: "Batch",
    then: (schema) => schema.required("Must select end time window"),
    otherwise: (schema) => schema,
  }),
  sendDate: yup.date().when("sendMethod", {
    is: (val:string)=> val=== "Scheduled" || val === "Batch" || val==="ColumnDate", 
    then: (schema) => schema.required("Must select send date").min(yup.ref(String(new Date(Date.now()))), ' send date cannot be earlier than today'),
    otherwise: (schema) => schema,
  }),
});
