using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public class RefreshSessionRepository(TasksDbContext context) : IRefreshSessionRepository
    {
        public async Task Create(int userId, string refreshToken, string fingerprint)
        {
            RefreshSession refreshSession = new RefreshSession() {
            UserId = userId,
            RefreshToken = refreshToken,
            FingerPrint = fingerprint,
            };

            context.RefreshSessions.Add(refreshSession);

            await context.SaveChangesAsync();
        }

        public async Task Delete(RefreshSession refreshSession)
        {
            context.RefreshSessions.Remove(refreshSession);

            await context.SaveChangesAsync();
        }

        public async Task<RefreshSession> Get(string refreshToken)
        {
            RefreshSession lastSession = context.RefreshSessions.OrderByDescending(ent=>ent.Id).First();

            bool check = lastSession.RefreshToken == refreshToken;

            RefreshSession refreshSession = await context.RefreshSessions.FirstOrDefaultAsync(ent=>ent.RefreshToken ==  refreshToken);

            return refreshSession;
        }
    }
}
