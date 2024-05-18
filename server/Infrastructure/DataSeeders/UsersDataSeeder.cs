using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class UsersDataSeeder : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(
                new User() { Id = 1, Login = "Сунгатуллин Айдар", Password = "111111", Email = "mrm.aimdar@mail.ru" },
                new User() { Id = 2, Login = "Несущий слово", Password = "111111", Email = "mrm.aimdari2@mail.ru" },
                new User() { Id = 3, Login = "Царь интернета", Password = "111111", Email = "mrm.aimdar3@mail.ru" },
                new User() { Id = 4, Login = "Чилипов Семен", Password = "111111", Email = "mrm.aimdar4@mail.ru" },
                new User() { Id = 5, Login = "Калугина Анна", Password = "111111", Email = "mrm.aimdar5@mail.ru" }
                );
        }
    }
}
