using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class PriorityDataSeeder : IEntityTypeConfiguration<Priority>
    {
        public void Configure(EntityTypeBuilder<Priority> builder)
        {
            builder.HasData(
                new Priority() { Id = 1, Name = "Обычный"},
                new Priority() { Id = 2, Name = "Низкий"},
                new Priority() { Id = 3, Name  = "Средний"},
                new Priority() { Id = 4, Name = "Высокий" }
                );
        }
    }
}
