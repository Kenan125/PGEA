import { Recipient } from "./Recipient";

export interface initialValues {

  sendMethod:
    | ""
    | "Hemen Gönder"
    | "İleri Tarihte Gönder"
    | "Parçalı Gönder"
    | "Sütundaki Tarihe Gönder";
  selectedPhoneNumberColumn: string;
  selectedSendDateColumn: string;
  selectedMessageInput: string,
  isLastSendDate: boolean;
  lastSendDate: string;
  messageInput: string;
  recipients: Recipient[];
  sendDate: string;
  batchSize?: number;
  intervalMinutes?: number;
  timeWindowStart?: string;
  timeWindowEnd?: string;
  time?: string;
}