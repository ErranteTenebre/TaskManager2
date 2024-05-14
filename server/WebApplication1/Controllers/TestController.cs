using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.RestAPI.Helpers;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api")]
    public class TestController : ControllerBase
    {
        private JwtService _jwtService;

        public TestController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost]
        [Route("test")]
        public void Test()
        {
           JwtSecurityToken token = _jwtService.VerifyRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtcm0uYWltZGFyQG1haWwucnUiLCJleHAiOjE3MTY2NTE1NzF9.G2l9KWgNXjOoU90eerW6OkJRdyoR_iYDAqse1NXtoYc");

           var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
           var emailClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);

           int userId = int.Parse(userIdClaim?.Value);
           string email = emailClaim?.Value;

        }
    }
}
