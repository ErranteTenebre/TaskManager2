using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.EntitiesConfigurations
{
    public class TaskEntityConfiguration : IEntityTypeConfiguration<TaskEntity>
    {
        public void Configure(EntityTypeBuilder<TaskEntity> builder)
        {
            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(t => t.Description)
                .HasMaxLength(1000);

            builder.Property(t => t.CreatedDate)
                .IsRequired();

            builder.Property(t => t.StartDate)
                .IsRequired(false);

            builder.Property(t => t.CreatorId)
                .IsRequired();

            builder.HasOne(t => t.Priority)
                .WithMany()
                .HasForeignKey(t => t.PriorityId);
            builder.HasOne(t => t.Creator)
                .WithMany()
                .HasForeignKey(t => t.CreatorId);
            builder.HasOne(t => t.Workspace)
                .WithMany()
                .HasForeignKey(t => t.WorkspaceId);
            builder.HasOne(t => t.Project)
                .WithMany()
                .HasForeignKey(t => t.ProjectId);

            builder.HasMany(t => t.TaskResponsibles)
                .WithOne() 
                .HasForeignKey(tr => tr.TaskId)
                .OnDelete(DeleteBehavior.NoAction);
            
        }
    }
}
