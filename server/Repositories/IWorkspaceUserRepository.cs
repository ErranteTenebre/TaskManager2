using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public interface IWorkspaceUserRepository
    {
        public Task<List<Workspace>> GetByUserId(int userId);
        public Task<List<User>> GetUsers(string workspaceId);
        public Task<WorkspaceUser> GetUser(string workspaceId, int userId);
        public Task<WorkspaceUser> Create(string workspaceId, int  userId, int roleId);
    }
}
