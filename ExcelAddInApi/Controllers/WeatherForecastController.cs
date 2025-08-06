using Domain.Dtos;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExcelAddInApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IMessageService messageService)
        {
            _logger = logger;
            _messageService = messageService;
        }
        [HttpPost("send-now")]
        public async Task<IActionResult> SendNow([FromBody] MessageRequest dto)
        {
            var result = await _messageService.SendMessageNowAsync(dto);
            return result ? Ok() : BadRequest();
        }
        [HttpPost("send-in-parts")]
        public async Task<IActionResult> SendInParts(bool isLastSend,[FromBody] MessageRequest dto)
        {
            var result = await _messageService.SendInbatchesAsync(dto,isLastSend);
            return result ? Ok() : BadRequest();
        }
        [HttpPost("send-scheduled")]
        public async Task<IActionResult> SendScheduled([FromBody] MessageRequest dto)
        {
            var result = await _messageService.SendScheduledAsync(dto);
            return result ? Ok() : BadRequest();
        }
        [HttpPost("sendColumnDate")]
        public async Task<IActionResult> SendColumnDate([FromBody] MessageRequest dto)
        {
            var result = await _messageService.SendColumnDateAsync(dto);
            return result ? Ok() : BadRequest();
        }
        [HttpPost("start")]
        public async Task<IActionResult> Start(bool isLastSend, [FromQuery] SendMethodDto sendMethod, [FromBody] MessageRequest dto)
        {


            if (sendMethod == SendMethodDto.Now)
            {
                var result = await _messageService.SendMessageNowAsync(dto);
                return result ? Ok() : BadRequest();
            }
            else if (sendMethod == SendMethodDto.Batch)
            {
                var result = await _messageService.SendInbatchesAsync(dto,isLastSend);
                return result ? Ok() : BadRequest();
            }
            else if (sendMethod == SendMethodDto.Scheduled)
            {
                var result = await _messageService.SendScheduledAsync(dto);
                return result ? Ok() : BadRequest();
            }
            else if (sendMethod == SendMethodDto.PerRecipientSchedule)
            {
                var result = await _messageService.SendColumnDateAsync(dto);
                return result ? Ok() : BadRequest();
            }
            else
            {
                return BadRequest("Invalid action type");
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] MessageRequest dto)
        {
            var result = await _messageService.SendAsync(dto);
            return result ? Ok() : BadRequest();
        }

        
    }
}
