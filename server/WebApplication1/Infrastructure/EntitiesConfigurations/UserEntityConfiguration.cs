using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.EntitiesConfigurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(p => p.Password)
                .HasMaxLength(60);

            builder.Property(p => p.Email)
                .HasMaxLength(100);

            builder.Property(p=> p.Login)
                .HasMaxLength(40);
        }
    }
}
