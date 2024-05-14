using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Infrastructure.EntitiesConfigurations;


namespace TaskManager.EntityFramework;
    
public class TasksDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<RefreshSession> RefreshSessions { get; set; }
    public TasksDbContext(DbContextOptions<TasksDbContext> options) : base(options)
    {
        
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserEntityConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}