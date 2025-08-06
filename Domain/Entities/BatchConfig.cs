namespace Domain.Entities
{
    public class BatchConfig
    {
        public int Id { get; set; }
        public int BulkSmsRequestId { get; set; }
        public int BatchSize { get; set; } // For batch send
        public int BatchIntervalMinutes { get; set; } // For batch send
        public TimeSpan TimeWindowStart { get; set; }
        public TimeSpan TimeWindowEnd { get; set; }        

        public BulkSmsRequest BulkSmsRequest { get; set; }
    }
}
