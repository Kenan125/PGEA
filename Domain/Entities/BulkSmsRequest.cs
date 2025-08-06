namespace Domain.Entities
{
    public class BulkSmsRequest
    {
        public int Id { get; set; }
        public int SmsMessageId { get; set; }
        public int SenderId { get; set; }
        public SendMethod SendMethod { get; set; }
        public bool IsLastSendDate { get; set; } = false;
        public DateTime? LastSendDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public  BulkSmsMessage SmsMessage { get; set; }
        
        public ICollection<BulkSmsRecipient> Recipients { get; set; }
        public BatchConfig BatchConfig { get; set; }

    }
}
