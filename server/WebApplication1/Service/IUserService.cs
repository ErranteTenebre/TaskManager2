using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Service
{
    public interface IUserService
    {
        public Task<(string accessToken, string refreshToken, int expireTime)> Register(string email, string password, string login, string fingerprint);
        public Task<(string accessToken, string refreshToken, int expireTime)> Login(string email, string password, string fingerprint);
        public Task<(string AccessToken, string NewRefreshToken, DateTime AccessTokenExpiration)> Refresh(string refreshToken, string fingerPrint);
        public Task LogOut(string refreshToken);
        public Task<User> GetByEmail(string email);
        public Task<User> GetById(int id);
    }
}
