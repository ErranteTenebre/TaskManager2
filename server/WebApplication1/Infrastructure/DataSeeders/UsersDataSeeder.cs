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
                new User() { Id = 1, Password = "123", Email = "mrm.aimdar@mail.ru" }
                );
        }
    }
}
