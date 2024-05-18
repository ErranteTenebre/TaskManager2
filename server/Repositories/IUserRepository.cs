
using WebApplication1.Infrastructure.Entities;

namespace TaskManager.Core.Repositories
{
    public interface IUserRepository
    {
        Task<User> Create(string email, string password, string login);
        Task<User> GetByEmail(string email);
        Task<User> GetById(int id);
    }
}
