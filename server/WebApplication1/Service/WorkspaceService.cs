using WebApplication1.Infrastructure.Entities;
using WebApplication1.Repositories;

namespace WebApplication1.Service
{
    public class WorkspaceService : IWorkspaceService
    {
        private IWorkspaceRepository _workspaceRepository;
        private IWorkspaceUserRepository _workspaceUserRepository;

        public WorkspaceService(IWorkspaceRepository workspaceRepository, IWorkspaceUserRepository workspaceUserRepository)
        {
            _workspaceRepository = workspaceRepository;
            _workspaceUserRepository = workspaceUserRepository;
        }

        public async Task<List<Workspace>> GetAll(int userId)
        {
            return await _workspaceUserRepository.GetByUserId(userId);
        }
    }
}
