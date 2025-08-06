namespace Domain.Dtos
{
    public class BatchSetting
    {
        public int BatchSize { get; set; }
        public int IntervalMinutes { get; set; }
        public TimeSpan TimeWindowStart { get; set; }
        public TimeSpan TimeWindowEnd { get; set; }
        //public DateTime? LastSendDate { get; set; }



    }
}
