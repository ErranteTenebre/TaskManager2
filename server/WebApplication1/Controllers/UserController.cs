using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using TaskManager.Core.Repositories;
using TaskManager.RestAPI.Helpers;
using WebApplication1.Dtos;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Service;


namespace TaskManager.RestAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtService _jwtService;

        public AuthController(JwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
        }

        [HttpPost("register")]

        public async Task<ActionResult<(string accessToken, int expireTime)>> Register([FromBody] RegisterDto dto)
        {
            string fingerprint = HttpContext.Request.Headers["Fingerprint"];
            try
            {
                (string accessToken, string refreshToken, int expireTime) = await _userService.Register(dto.email, dto.password, dto.login, fingerprint);

                Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions()
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    MaxAge = TimeSpan.FromDays(15)
                }); ;

                return Ok(new{ accessToken, expireTime });

            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }   
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginDto dto)
        {
            string fingerprint = HttpContext.Request.Headers["Fingerprint"];

            try
            {
                (string accessToken, string refreshToken, int expireTime) = await _userService.Login(dto.email, dto.password, fingerprint);

                Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions()
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    MaxAge = TimeSpan.FromDays(15)
                }); ;

                return Ok(new { accessToken, expireTime });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("user")]
        public async Task<ActionResult<User>> GetUser()
        {
            string path = Request.Path;
            JwtSecurityToken accessToken = (JwtSecurityToken) HttpContext.Items["VerifiedToken"];

            (int userId, string email) = _jwtService.GetJwtTokenClaims(accessToken);

           User user = await _userService.GetById(userId);

            return user;
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            if (Request.Cookies.ContainsKey("RefreshToken"))
            {
                string refreshToken = Request.Cookies["RefreshToken"];

                _userService.LogOut(refreshToken);

                Response.Cookies.Delete("RefreshToken", new CookieOptions{
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    MaxAge = TimeSpan.FromDays(15)
                });

                return Ok();
            }
            else
            {
                return BadRequest("Вы не авторизованы");
            } 
        }
                        
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()                  
        {   
            string fingerprint = HttpContext.Request.Headers["Fingerprint"];
            string currentRefreshToken = Request.Cookies["RefreshToken"];

            try
            {
                (string accessToken, string newRefreshToken, DateTime accessTokenExpiration) = await _userService.Refresh(currentRefreshToken, fingerprint);

                Response.Cookies.Append("RefreshToken", newRefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(15) 
                });

                return Ok(new
                {
                    AccessToken = accessToken,
                    AccessTokenExpiration = accessTokenExpiration
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }

}

