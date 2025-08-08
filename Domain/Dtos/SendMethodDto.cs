using System.Text.Json.Serialization;

namespace Domain.Dtos
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SendMethodDto
    {
        Now = 0,
        Scheduled = 1,
        Batch = 2,
        PerRecipientSchedule = 3
    }
}
