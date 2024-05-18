using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class WorkspaceDataSeeder : IEntityTypeConfiguration<Workspace>
    {
        public void Configure(EntityTypeBuilder<Workspace> builder)
        {
            builder.HasData(
                new Workspace() { Id = "1c6e5e97-5e3b-43aa-b804-8d5eaf972440", Title = "Мое рабочее пространство" },
                new Workspace() { Id = "1c6e5e97-5e3b-43aa-b804-8d5eaf922411", Title = "Команда мечты" },
                new Workspace() { Id = "1c6e5e97-5e3b-56ya-b804-8d5eaf922411", Title = "Неуставающие" }
                );
        }
    }
}
