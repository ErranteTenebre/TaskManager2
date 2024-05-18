using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public interface IRefreshSessionRepository
    {
        public Task<RefreshSession> Get(string refreshToken);
        public Task Create(int userId, string refreshToken, string fingerprint);
        public Task Delete(RefreshSession refreshSession);
    }
}
