namespace Domain.Entities
{
    public enum SendMethod
    {
        Now = 0,
        Scheduled = 1,
        Batch = 2,
        PerRecipientSchedule = 3
    }
}
