using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.EntitiesConfigurations
{
    public class RefreshSessionEntityConfiguration : IEntityTypeConfiguration<RefreshSession>
    {
        public void Configure(EntityTypeBuilder<RefreshSession> builder)
        {
            builder.HasKey(x => x.Id);

            builder
                .HasOne<User>(ent => ent.User) // Указываем связь RefreshSession с User
                .WithMany() // RefreshSession может иметь много записей User, но User может иметь только одну RefreshSession
                .HasForeignKey(ent => ent.UserId) // Устанавливаем внешний ключ
                .IsRequired(); // Указываем, что это обязательное отношение
        }
    }
}
