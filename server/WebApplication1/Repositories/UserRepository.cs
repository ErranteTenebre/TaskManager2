using Microsoft.EntityFrameworkCore;
using TaskManager.Core.Repositories;
using WebApplication1.Infrastructure.Entities;


namespace TaskManager.EntityFramework.Repositories;

public class UserRepository(TasksDbContext context) : IUserRepository
{
    public async Task<User> Create(string email, string password, string login)
    {
        User user = new User()
        {
            Password = password,
            Email = email,
            Login = login,
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<User> GetById(int id)
    {
        User dbUser = context.Users.FirstOrDefault(e => e.Id == id);

        return dbUser;
    }

    public async Task<User> GetByEmail(string email)
    {
        User dbUser = await context.Users.FirstOrDefaultAsync(e => e.Email == email);

        return dbUser;
    }
}