using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context
{
    public class PostaGuverciniDbContextBlazor : DbContext
    {
        public PostaGuverciniDbContextBlazor(DbContextOptions<PostaGuverciniDbContextBlazor> options) : base(options) { }

        public DbSet<BulkSmsRequest> BulkSmsRequests { get; set; }
        public DbSet<BulkSmsMessage> SmsMesages { get; set; }
        public DbSet<BulkSmsRecipient> SmsRecipients { get; set; }
        public DbSet<BatchConfig> BatchConfigs { get; set; }
        


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BulkSmsRequest>()
                .Property(b => b.SendMethod)
                .HasConversion<string>();
            base.OnModelCreating(modelBuilder);

            /*// Static values
            var userId = int.Parse("1");
            var messageId = int.Parse("2");
            var requestId = int.Parse("3");
            var batchConfigId = int.Parse("4");
            var recipient1Id = int.Parse("5");
            var recipient2Id = int.Parse("6");

            

            modelBuilder.Entity<BulkSmsMessage>().HasData(new BulkSmsMessage
            {
                Id = messageId,
                MessageBody = "Hello from Bulk SMS!",
                CreatedAt = new DateTime(2024, 01, 01),
                StartSendTime = new DateTime(2024, 01, 01, 9, 0, 0)
            });

            modelBuilder.Entity<BulkSmsRequest>().HasData(new BulkSmsRequest
            {
                Id = requestId,
                SmsMessageId = messageId,
                SenderId = userId,
                CreatedAt = new DateTime(2024, 01, 01),
                SendMethod = SendMethod.Batch,
                IsLastSendDate = false
            });

            modelBuilder.Entity<BulkSmsRecipient>().HasData(
                new BulkSmsRecipient
                {
                    Id = recipient1Id,
                    BulkSmsRequestId = requestId,
                    PhoneNumber = "+12345678901",
                    
                },
                new BulkSmsRecipient
                {
                    Id = recipient2Id,
                    BulkSmsRequestId = requestId,
                    PhoneNumber = "+19876543210",
                    
                }
            );

            modelBuilder.Entity<BatchConfig>().HasData(new BatchConfig
            {
                Id = batchConfigId,
                BulkSmsRequestId = requestId,
                BatchSize = 100,
                BatchIntervalMinutes = 5,
                TimeWindowStart = new TimeOnly(9, 0, 0),
                TimeWindowEnd = new TimeOnly(17, 0, 0)
            });*/
        }


    }
}
