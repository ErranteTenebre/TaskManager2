using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public interface IWorkspaceUserRepository
    {
        public Task<List<Workspace>> GetByUserId(int userId);
    }
}
