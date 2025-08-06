namespace Domain.Dtos
{
    public class MessageRequest
    {
       
        public bool IsLastSendDate { get; set; } = false;
        public DateTime? LastSendDate { get; set; }
        public SendMethodDto SendMethod { get; set; }
        public MessageContent MessageContent { get; set; }
        public BatchSetting? BatchSetting { get; set; }
        

    }
}
