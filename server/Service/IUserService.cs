using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Service
{
    public interface IUserService
    {
        public Task<(string accessToken, string refreshToken, int expireTime, User user)> Register(string email, string password, string login, string fingerprint);
        public Task<(string accessToken, string refreshToken, int expireTime, User user)> Login(string email, string password, string fingerprint);
        public Task<(string AccessToken, string NewRefreshToken, DateTime AccessTokenExpiration)> Refresh(string refreshToken, string fingerPrint);
        public Task LogOut(string refreshToken);
        public Task<User> GetByEmail(string email);
        public Task<User> GetById(int id);
        public Task<User> GetByRefreshToken(string stringRefreshToken);
    }
}
