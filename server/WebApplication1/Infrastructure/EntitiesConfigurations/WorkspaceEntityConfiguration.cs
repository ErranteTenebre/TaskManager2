using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.EntitiesConfigurations
{
    public class WorkspaceEntityConfiguration : IEntityTypeConfiguration<Workspace>
    {
        public void Configure(EntityTypeBuilder<Workspace> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(ent => ent.Title)
                .HasMaxLength(60);
        }
    }
}
