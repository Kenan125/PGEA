using AutoMapper;
using Domain.Dtos;
using Domain.Entities;
using Domain.Interfaces;

namespace Services.Services
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public MessageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public async Task<bool> SendMessageNowAsync(MessageRequest message)
        {
            message.BatchSetting = null;
            
            var model = mapper.Map<BulkSmsRequest>(message);
            model.Recipients.FirstOrDefault().SendDate = DateTime.Now;
            
            model.SenderId = 20;
            if (model == null)
            {
                return false;
            }
            await unitOfWork.GetRepository<BulkSmsRequest>().AddAsync(model);
            await unitOfWork.CommitAsync();
            return true;

        }

        public async Task<bool> SendInbatchesAsync(MessageRequest message, bool isLastSend)
        {
            if (message == null || message.MessageContent.Recipients == null || message.BatchSetting == null || message.BatchSetting.BatchSize == 0 || message.BatchSetting.IntervalMinutes == 0)
            {
                return false;
            }
            var allRecipients = message.MessageContent.Recipients;
            int batchSize = message.BatchSetting.BatchSize;
            int intervalMinutes = message.BatchSetting.IntervalMinutes;
            DateTime sendDate = message.MessageContent.Recipients.FirstOrDefault().SendDate;
                       
            var recepientBatches = allRecipients.Select((recipient, index) => new { recipient, index }).GroupBy(x => x.index / batchSize).Select(g => g.Select(x => x.recipient).ToList()).ToList();

            TimeSpan startTime = message.BatchSetting.TimeWindowStart;
            TimeSpan endTime = message.BatchSetting.TimeWindowEnd;
            message.IsLastSendDate = isLastSend;

            
            while (recepientBatches.Any() && !(isLastSend==true && message.LastSendDate != null && message.LastSendDate < DateTime.Now))
            {
                
                var now = DateTime.Now;
                var currentTime = now.TimeOfDay;
                bool isCurrentlyInWindow;

                if (startTime <= endTime)
                {
                    isCurrentlyInWindow = (currentTime >= startTime && currentTime < endTime);
                }
                else
                {
                    isCurrentlyInWindow = (currentTime >= startTime || currentTime < endTime);
                }
                if (isCurrentlyInWindow)
                {
                    if (DateTime.Now < sendDate)
                    {

                        var delay = sendDate - DateTime.Now;
                        await Task.Delay(delay);
                    }
                    var batch = recepientBatches[0];

                    var bulkRequest = mapper.Map<BulkSmsRequest>(message);
                    bulkRequest.Recipients = mapper.Map<List<BulkSmsRecipient>>(batch);
                    
                    bulkRequest.SenderId =  20;

                    await unitOfWork.GetRepository<BulkSmsRequest>().AddAsync(bulkRequest);
                    await unitOfWork.CommitAsync();

                    recepientBatches.RemoveAt(0);

                    if (intervalMinutes > 0)
                    {
                        await Task.Delay(intervalMinutes * 60 * 1000);
                    }
                }
                else
                {
                    DateTime nextStartTime;
                    if (now.TimeOfDay >= endTime && now.TimeOfDay > startTime)
                    {
                        Console.WriteLine("Kaboooom");
                        nextStartTime = now.Date.AddDays(1).Add(startTime);
                    }
                    else if (now.TimeOfDay < startTime && now.TimeOfDay < endTime && startTime < endTime)
                    {
                        Console.WriteLine("I was hiding hahahahaha");
                        nextStartTime = now.Date.Add(startTime);
                    }
                    else
                    {
                        nextStartTime = now.Date.AddDays(1).Add(startTime);
                        Console.WriteLine("Something went wrong " + nextStartTime);
                    }
                    var delayuntilNextWindow = nextStartTime - now;
                    if (delayuntilNextWindow > TimeSpan.Zero)
                    {
                        await Task.Delay(delayuntilNextWindow);

                    }
                }

            }
            return true;
        }

        public async Task<bool> SendScheduledAsync(MessageRequest message)
        {
            message.BatchSetting = null;
            var model = mapper.Map<BulkSmsRequest>(message);
            DateTime sendDate = message.MessageContent.Recipients.First().SendDate;
            if (DateTime.Now < sendDate)
            {
                var delay = sendDate - DateTime.Now;
                await Task.Delay(delay);
            }
            
            model.SenderId = 20;
            if (model == null)
            {
                return false;
            }
            await unitOfWork.GetRepository<BulkSmsRequest>().AddAsync(model);
            await unitOfWork.CommitAsync();
            return true;
        }

        public async Task<bool> SendColumnDateAsync(MessageRequest message)
        {
            message.BatchSetting = null;
            var allRecipients = message.MessageContent.Recipients;

            var recipients = allRecipients.GroupBy(r => r.SendDate).OrderBy(g => g.Key).ToList();


            foreach (var recipient in recipients)
            {
                var sendDate = recipient.Key;

                var now = DateTime.Now;

                if (now < sendDate)
                {
                    var delay = sendDate - now;
                    await Task.Delay(delay);
                }
                var model = mapper.Map<BulkSmsRequest>(message);
                model.Recipients = mapper.Map<List<BulkSmsRecipient>>(recipient.ToList());
                
                model.SenderId = 20;
                if (model == null)
                {
                    return false;
                }
                await unitOfWork.GetRepository<BulkSmsRequest>().AddAsync(model);
                await unitOfWork.CommitAsync();
            }


            return true;
        }

        public async Task<bool> SendAsync(MessageRequest message)
        {
            var model = mapper.Map<BulkSmsRequest>(message);
            

            if (model == null)
            {
                return false;
            }
            model.SenderId = 20;
            await unitOfWork.GetRepository<BulkSmsRequest>().AddAsync(model);
            await unitOfWork.CommitAsync();
            return true;
        }
    }
}
