using Domain.Dtos;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExcelAddInApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SendMessageController : Controller
    {
        private readonly IMessageService _messageService;

        public SendMessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] MessageRequest dto)
        {
            var result = await _messageService.SendAsync(dto);
            return result ? Ok() : BadRequest();
        }
    }
}
