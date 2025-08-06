using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class i : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SmsMesages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MessageBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SmsMesages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BulkSmsRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SmsMessageId = table.Column<int>(type: "int", nullable: false),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    SendMethod = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsLastSendDate = table.Column<bool>(type: "bit", nullable: false),
                    LastSendDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BulkSmsRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BulkSmsRequests_SmsMesages_SmsMessageId",
                        column: x => x.SmsMessageId,
                        principalTable: "SmsMesages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BatchConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BulkSmsRequestId = table.Column<int>(type: "int", nullable: false),
                    BatchSize = table.Column<int>(type: "int", nullable: false),
                    BatchIntervalMinutes = table.Column<int>(type: "int", nullable: false),
                    TimeWindowStart = table.Column<TimeSpan>(type: "time", nullable: false),
                    TimeWindowEnd = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchConfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BatchConfigs_BulkSmsRequests_BulkSmsRequestId",
                        column: x => x.BulkSmsRequestId,
                        principalTable: "BulkSmsRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SmsRecipients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BulkSmsRequestId = table.Column<int>(type: "int", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SendDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SmsRecipients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SmsRecipients_BulkSmsRequests_BulkSmsRequestId",
                        column: x => x.BulkSmsRequestId,
                        principalTable: "BulkSmsRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BatchConfigs_BulkSmsRequestId",
                table: "BatchConfigs",
                column: "BulkSmsRequestId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BulkSmsRequests_SmsMessageId",
                table: "BulkSmsRequests",
                column: "SmsMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_SmsRecipients_BulkSmsRequestId",
                table: "SmsRecipients",
                column: "BulkSmsRequestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BatchConfigs");

            migrationBuilder.DropTable(
                name: "SmsRecipients");

            migrationBuilder.DropTable(
                name: "BulkSmsRequests");

            migrationBuilder.DropTable(
                name: "SmsMesages");
        }
    }
}
