import axios from "axios";
type payloadProps = {
  sendMethod: string;
  isLastSendDate?: boolean;
  lastSendDate?: string;
  messageContent: { 
    recipients: Array<{
      phoneNumber: string;
      sendDate: string;
      messageInput: string;
    }>;
  };
  batchSetting?: {
    batchSize?: number;
    intervalMinutes?: number;
    timeWindowStart?: string ;
    timeWindowEnd?: string ;
  };
};

export async function send(payload: payloadProps): Promise<void> {
  try {
    const response = await axios.post(`https://localhost:5001/SendMessage/send`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Message send created successfully!", response.data);
  } catch (error) {
    console.error("Error creating post:", error);
    console.error("Status: "+ error.status)
    if (error.response?.data?.errors) {
      console.error("Validation errors:", error.response.data.errors);
    }
  }
}
