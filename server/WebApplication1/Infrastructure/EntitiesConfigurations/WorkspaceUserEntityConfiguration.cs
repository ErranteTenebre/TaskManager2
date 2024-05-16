using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.EntitiesConfigurations
{
    public class WorkspaceUserEntityConfiguration : IEntityTypeConfiguration<WorkspaceUser>
    {
        public void Configure(EntityTypeBuilder<WorkspaceUser> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(ent => ent.User)
                .WithMany()
                .HasForeignKey(ent => ent.UserId)
                .IsRequired();

            builder.HasOne(ent => ent.Workspace)
                .WithMany()
                .HasForeignKey(ent => ent.WorkSpaceId)
                .IsRequired();
        }
    }
}
