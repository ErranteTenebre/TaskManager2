using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class StageDataSeeder : IEntityTypeConfiguration<TaskStageEntity>
    {
        public void Configure(EntityTypeBuilder<TaskStageEntity> builder)
        {
            builder.HasData(
                new TaskStageEntity() { Id = 1, Name = "Для выполнения"},
                new TaskStageEntity() { Id = 2, Name = "В процессе"},
                new TaskStageEntity() { Id = 3, Name  = "Выполнена"}
                );
        }
    }
}
