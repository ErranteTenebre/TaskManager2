using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public interface IWorkspaceRepository
    {
        public Task<Workspace> Get(string workspaceId);
        public Task<List<Workspace>> GetAll(int userId);
        public Task<Workspace> Create(int title);
        public Task Delete(int id);
        public Task Update(int id, string title);
    }
}
