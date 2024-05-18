using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class WorkspaceRoleDataSeeder : IEntityTypeConfiguration<WorkspaceRole>
    {
        public void Configure(EntityTypeBuilder<WorkspaceRole> builder)
        {
            builder.HasData(
                new WorkspaceRole() { Id = 1, Name = "Участник" },
                new WorkspaceRole() { Id = 2, Name = "Администратор" }
            );
        }
    }
}
