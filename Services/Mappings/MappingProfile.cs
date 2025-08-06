using AutoMapper;
using Domain.Dtos;
using Domain.Entities;


namespace Services.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            
            CreateMap<SendMethodDto, SendMethod>().ReverseMap();

            
            CreateMap<Recipient, BulkSmsRecipient>()
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.SendDate, opt => opt.MapFrom(src => src.SendDate));

            
            CreateMap<BatchSetting, BatchConfig>()
                .ForMember(dest => dest.BatchSize, opt => opt.MapFrom(src => src.BatchSize))
                .ForMember(dest => dest.BatchIntervalMinutes, opt => opt.MapFrom(src => src.IntervalMinutes))
                .ForMember(dest => dest.TimeWindowStart, opt => opt.MapFrom(src => src.TimeWindowStart))
                .ForMember(dest => dest.TimeWindowEnd, opt => opt.MapFrom(src => src.TimeWindowEnd));

            
            CreateMap<MessageContent, BulkSmsMessage>()
                .ForMember(dest => dest.MessageBody, opt => opt.MapFrom(src => src.MessageInput))               
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.Now))
                .ForMember(dest => dest.BulkSmsRequests, opt => opt.Ignore());

            
            CreateMap<MessageRequest, BulkSmsRequest>()
                .ForMember(dest => dest.IsLastSendDate, opt => opt.MapFrom(src => src.IsLastSendDate))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.Now))
                .ForMember(dest => dest.SmsMessage, opt => opt.MapFrom(src => src.MessageContent))
                .ForMember(dest => dest.Recipients, opt => opt.MapFrom(src => src.MessageContent.Recipients))
                .ForMember(dest => dest.BatchConfig, opt => opt.MapFrom(src => src.BatchSetting))
                .ForMember(dest => dest.LastSendDate, opt => opt.MapFrom(src => src.LastSendDate))
                .ForMember(dest => dest.SendMethod, opt => opt.MapFrom(src => src.SendMethod));
            

        }
    }
}
