using Domain.Dtos;

namespace Domain.Interfaces
{
    public interface IMessageService
    {
        //Task<bool> SendMessageNowAsync(MessageContent message, int id);
        Task<bool> SendMessageNowAsync(MessageRequest message);
        Task<bool> SendInbatchesAsync(MessageRequest message, bool isLastSend);
        Task<bool> SendScheduledAsync(MessageRequest message);
        Task<bool> SendColumnDateAsync(MessageRequest message);
        Task<bool> SendAsync(MessageRequest message);

    }
}
