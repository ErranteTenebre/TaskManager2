using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public class WorkspaceUserRepository(TasksDbContext dbContext) : IWorkspaceUserRepository
    {
        public async Task<List<Workspace>> GetByUserId(int userId)
        {
           return await dbContext.WorkspacesUsers
                .Where(ent => ent.UserId == userId)
                .Select(ent=>ent.Workspace)
                .ToListAsync();
        }
    }
}
