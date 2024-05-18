using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.EntitiesConfigurations
{
    public class TaskResponsibleConfiguration : IEntityTypeConfiguration<TaskResponsible>
    {
        public void Configure(EntityTypeBuilder<TaskResponsible> builder)
        {
            builder.HasKey(tr => tr.Id);

            builder.HasOne(ent => ent.Responsible)
                .WithMany()
                .HasForeignKey(tr => tr.UserId)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }

}
