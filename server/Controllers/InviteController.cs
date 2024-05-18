using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using TaskManager.RestAPI.Helpers;
using WebApplication1.Dtos;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Service;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api")]
    public class InviteController(IConfiguration config, JwtService jwtService, IUserService userService, IWorkspaceService workspaceService) : ControllerBase
    {
        [HttpPost]
        [Route("invite")]
        public async Task<IActionResult> SendInvitation([FromBody] InviteDto dto)
        {
            try
            {
                User user = await userService.GetByEmail(dto.userEmail);

                if (user == null) return BadRequest();

                string token = jwtService.GenerateInviteToken(dto.userEmail, dto.workspaceId);

                Workspace workspace = await workspaceService.Get(dto.workspaceId);

                SendEmail(dto.userEmail, token, workspace);

                return Ok("Письмо с приглашением отправлено успешно.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ошибка при отправке приглашения: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("invite/accept")]
        public async Task<IActionResult> AcceptInvitation(string token)
        {
            try
            {
                (string userEmail, string workspaceId) = jwtService.VerifyInviteToken(token); // Проверка токена и получение email пользователя

                if (userEmail == null || workspaceId == null)
                {
                    return BadRequest("Неверный или просроченный токен.");
                }

                // Добавьте пользователя в рабочее пространство (логика добавления пользователя)
                await workspaceService.AddUser(workspaceId, userEmail, 1);

                return Redirect($"{config["ClientBaseUrl"]}/workspace/{workspaceId}/tasks"); // Перенаправление пользователя на рабочее пространство
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ошибка при принятии приглашения: {ex.Message}");
            }
        }

        private void SendEmail(string userEmail, string token, Workspace workspace)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Отправитель", "mrm.aimdari@mail.ru"));
            message.To.Add(new MailboxAddress("Получатель", userEmail));
            message.Subject = "Приглашение в наше приложение";
            message.Body = new TextPart("plain")
            {
                Text = @$"Здравствуйте! Вы получили приглашение в рабочее пространство {workspace.Title}!. Пройдите по ссылке, чтобы принять приглашение: {config["ServerBaseUrl"]}/invite/accept?token={token}"
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.mail.ru", 465, true);
                client.Authenticate("mrm.aimdari@mail.ru", "i8q1fzhthhxFmWxzzjTE");
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
