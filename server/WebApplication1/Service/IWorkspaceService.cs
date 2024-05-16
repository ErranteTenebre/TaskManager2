using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Service
{
    public interface IWorkspaceService
    {
        public Task<List<Workspace>> GetAll(int userId);
    }
}
