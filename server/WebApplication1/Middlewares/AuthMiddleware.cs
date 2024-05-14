using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using TaskManager.RestAPI.Helpers;

namespace WebApplication1.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtService _jwtService;

        public AuthMiddleware(RequestDelegate next, JwtService jwtService)
        {
            _next = next;
            _jwtService = jwtService;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Cookies.ContainsKey("RefreshToken"))
            {
                string refreshToken = context.Request.Cookies["RefreshToken"];
                try
                { 
                    JwtSecurityToken verifiedToken = _jwtService.VerifyRefreshToken(refreshToken);
                    context.Items["VerifiedToken"] = verifiedToken;
                    await _next(context);
                }
                catch (Exception ex)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized");
                }
             
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

        }

    }
}
