using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public class WorkspaceRepository(TasksDbContext dbContext) : IWorkspaceRepository
    {
        public async Task<Workspace> Create(int title)
        {
            throw new NotImplementedException();
        }

        public async Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Workspace> Get(string workspaceId)
        {
            return dbContext.Workspaces.FirstOrDefaultAsync(ent => ent.Id == workspaceId);
        }

        public async Task<List<Workspace>> GetAll(int userId)
        {
          return await dbContext.Workspaces.ToListAsync();
        }

        public async Task Update(int id, string title)
        {
            throw new NotImplementedException();
        }
    }
}
