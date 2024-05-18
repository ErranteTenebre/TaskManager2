using TaskManager.Core.Repositories;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Repositories;


namespace WebApplication1.Service
{
    public class WorkspaceService : IWorkspaceService
    {
        private IWorkspaceRepository _workspaceRepository;
        private IWorkspaceUserRepository _workspaceUserRepository;
        private IUserRepository _userRepository;

        public WorkspaceService(IWorkspaceRepository workspaceRepository, IWorkspaceUserRepository workspaceUserRepository, IUserRepository userRepository)
        {
            _workspaceRepository = workspaceRepository;
            _workspaceUserRepository = workspaceUserRepository;
            _userRepository = userRepository;
        }

        public async Task<Workspace> Get(string workspaceId)
        {
            return await _workspaceRepository.Get(workspaceId);
        }

        public async Task<List<Workspace>> GetAll(int userId)
        {
            return await _workspaceUserRepository.GetByUserId(userId);
        }

        public async Task<List<User>> GetUsers(string workspaceId)
        {
            return await _workspaceUserRepository.GetUsers(workspaceId);
        }

        public async Task<WorkspaceUser> AddUser(string workspaceId, string email, int roleId)
        {
            User user = await _userRepository.GetByEmail(email);

            if (user == null)
            {
                throw new BadHttpRequestException("Пользователь не существует", 400);
            }

           return await _workspaceUserRepository.Create(workspaceId, user.Id, roleId);
        }

        public async Task<WorkspaceUser> GetWorkspaceUser(string workspaceId, int userId)
        {
            return await _workspaceUserRepository.GetUser(workspaceId, userId);
        }
    }
}
