import axios from "axios";
type payloadProps = {
  isLastSendDate: boolean;
  messageContent: {
    messageInput: string;
    recipients: Array<{
      phoneNumber: string;
      sendDate: string;
    }>;
  }
};

export async function sendScheduled(payload: payloadProps,sendMethod:number,id:number): Promise<void> {
  try {
    const response = await axios.post(
      "https://localhost:5001/WeatherForecast/start",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params:{
          sendMethod:sendMethod,
          id:id
        }
      }
    );
    console.log("Batch send created successfully!", response.data);
  } catch (error) {
    console.error("Error creating post:", error);
    if (error.response?.data?.errors) {
      console.error("Validation errors:", error.response.data.errors);
    }
  }
}
