namespace Domain.Entities
{
    public class BulkSmsMessage
    {
        public int Id { get; set; }
        public string MessageBody { get; set; }
         
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<BulkSmsRequest> BulkSmsRequests { get; set; }
    }
}
