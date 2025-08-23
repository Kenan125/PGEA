export interface initialValues {
  Encoding: string;
  sendMethod:
    | ""
    | "Hemen Gönder"
    | "İleri Tarihte Gönder"
    | "Parçalı Gönder"
    | "Sütundaki Tarihe Gönder";
  
  selectedSendDateColumn: string;
  selectedMessageInput: string,
  isLastSendDate: boolean;
  lastSendDate: string;
  messageInput: string;
  recipients: [
    {phoneNumber: string,
    messageInput: string,
    sendDate?: string,
  }
  ];
  sendDate: string;
  batchSize?: number;
  intervalMinutes?: number;
  timeWindowStart?: string;
  timeWindowEnd?: string;
  time?: string;
}