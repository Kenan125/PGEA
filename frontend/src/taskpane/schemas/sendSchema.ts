import { format } from "date-fns";
import * as yup from "yup";

const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");

export const sendSchema = yup.object().shape({
  sendMethod: yup
    .string()
    .oneOf(["Now", "Scheduled", "Batch", "ColumnDate"])
    .required("Please select send method"),
  isLastSendDate: yup.boolean(),
  lastSendDate: yup.date().when("isLastSendDate", {
    is: true,
    then: (schema) =>
      schema
        .required("Must enter last send date")
        .min(yup.ref("sendDate"), "Last send date cannot be earlier than start date"),
    otherwise: (schema) => schema,
  }),
  messageInput: yup.string().required("Please enter message"),
  recipients: yup
    .array()
    .of(
      yup.object().shape({
        phoneNumber: yup
          .string()
          .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
          .required("Phone number required"),
        sendDate: yup.date().when("sendMethod", {
          is: (val: string) => val === "ColumnDate",
          then: (schema) =>
            schema
              .required("Must select send date column")
              .min(today, "Send date cannot be less than current date and time"),
          otherwise: (schema) => schema.nullable(),
        }),
      })
    )
    .min(1, "Please select a column to load recipients"),
  batchSize: yup.number().when("sendMethod", {
    is: "Batch",
    then: (schema) =>
      schema.required("Must enter batch size").min(1, "Batch size must be greater than 0"),
    otherwise: (schema) => schema,
  }),
  intervalMinutes: yup.number().when("sendMethod", {
    is: "Batch",
    then: (schema) =>
      schema
        .required("Must enter interval minutes")
        .min(1, "Interval Minutes must be greater than 0"),
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
    is: (val: string) => val === "Scheduled" || val === "Batch",
    then: (schema) =>
      schema
        .required("Must select send date")
        .min(today, "Send date cannot be less than current date and time"),
    otherwise: (schema) => schema,
  }),
  time: yup.string().when("sendMethod", {
    is: "ColumnDate",
    then: (schema) => schema.required("Select time"),
    otherwise: (schema) => schema,
  }),
});