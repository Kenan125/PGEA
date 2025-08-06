using DataAccess.UnitOfWorks;
using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Services.Mappings;
using Services.Services;

namespace Services.Extensions
{
    public static class DependencyExtensions
    {
        public static void AddExtensions(this IServiceCollection services)
        {

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());
        }
    }
}
