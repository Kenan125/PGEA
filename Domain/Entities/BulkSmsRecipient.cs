namespace Domain.Entities
{
    public class BulkSmsRecipient
    {
        public int Id { get; set; }
        public int BulkSmsRequestId { get; set; }
        public string PhoneNumber { get; set; }
         
        public DateTime SendDate { get; set; }

        public BulkSmsRequest BulkSmsRequest { get; set; }
    }
}
