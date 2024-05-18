using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Service
{
    public interface IWorkspaceService
    {
        public Task<Workspace> Get(string workspaceId);
        public Task<List<Workspace>> GetAll(int userId);
        public Task<List<User>> GetUsers(string workspaceId);
        public Task<WorkspaceUser> AddUser(string workspaceId,string email, int roleId);
        public Task<WorkspaceUser> GetWorkspaceUser(string workspaceId, int userId);
    }
}
