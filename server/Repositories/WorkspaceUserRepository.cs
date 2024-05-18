using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public class WorkspaceUserRepository(TasksDbContext dbContext) : IWorkspaceUserRepository
    {
        public async Task<WorkspaceUser> GetUser(string workspaceId, int userId)
        {
            return await dbContext.WorkspacesUsers.FirstOrDefaultAsync(ent =>
                ent.WorkSpaceId == workspaceId && ent.UserId == userId);
        }

        public async Task<WorkspaceUser> Create(string workspaceId, int userId, int roleId)
        {
            WorkspaceUser workspaceUser = new WorkspaceUser()
            {
                WorkSpaceId = workspaceId,
                UserId = userId,
                RoleId = roleId,
            };

            WorkspaceUser createdWorkspaceUser =  dbContext.WorkspacesUsers.Add(workspaceUser).Entity;

            await dbContext.SaveChangesAsync();

            return createdWorkspaceUser;
        }

        public async Task<List<Workspace>> GetByUserId(int userId)
        {
           return await dbContext.WorkspacesUsers
                .Where(ent => ent.UserId == userId)
                .Select(ent=>ent.Workspace)
                .ToListAsync();
        }

        public async Task<List<User>> GetUsers(string workspaceId)
        {
            return await dbContext.WorkspacesUsers
                .Where(ent=>ent.WorkSpaceId == workspaceId)
                .Select(ent =>ent.User)
                .ToListAsync();
        }
    }
}
