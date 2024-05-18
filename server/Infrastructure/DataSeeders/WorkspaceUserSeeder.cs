using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class WorkspaceUserDataSeeder : IEntityTypeConfiguration<WorkspaceUser>
    {
        public void Configure(EntityTypeBuilder<WorkspaceUser> builder)
        {
            builder.HasData(
                new WorkspaceUser() { Id = 1, WorkSpaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf972440", UserId = 1, RoleId = 2},
                new WorkspaceUser() { Id = 2, WorkSpaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf922411", UserId = 1, RoleId = 2 },
                new WorkspaceUser() { Id = 3, WorkSpaceId = "1c6e5e97-5e3b-56ya-b804-8d5eaf922411", UserId = 1, RoleId = 2 }
                );
        }
    }
}
