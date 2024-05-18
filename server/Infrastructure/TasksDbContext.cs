using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.DataSeeders;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Infrastructure.EntitiesConfigurations;


namespace TaskManager.EntityFramework;
    
public class TasksDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<RefreshSession> RefreshSessions { get; set; }
    public DbSet<Workspace> Workspaces { get; set; }
    public DbSet<WorkspaceUser> WorkspacesUsers { get; set; }
    public DbSet<WorkspaceRole> WorkspacesRoles { get; set; }
    public DbSet<Priority> Priorities { get; set; }
    public DbSet<TaskStageEntity> TasksStages { get; set; }
    public DbSet<TaskEntity> Tasks { get; set; }
    public DbSet<TaskResponsible> TasksResponsibles { get; set; }
    public TasksDbContext(DbContextOptions<TasksDbContext> options) : base(options)
    {
        
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
        modelBuilder.ApplyConfiguration(new RefreshSessionEntityConfiguration());
        modelBuilder.ApplyConfiguration(new WorkspaceEntityConfiguration());
        modelBuilder.ApplyConfiguration(new WorkspaceUserEntityConfiguration());
        modelBuilder.ApplyConfiguration(new TaskEntityConfiguration());
        modelBuilder.ApplyConfiguration(new TaskResponsibleConfiguration());

        modelBuilder.ApplyConfiguration(new UsersDataSeeder());
        modelBuilder.ApplyConfiguration(new WorkspaceDataSeeder());
        modelBuilder.ApplyConfiguration(new WorkspaceUserDataSeeder());
        modelBuilder.ApplyConfiguration(new PriorityDataSeeder());
        modelBuilder.ApplyConfiguration(new StageDataSeeder());
        modelBuilder.ApplyConfiguration(new TaskDataSeeder());
        modelBuilder.ApplyConfiguration(new WorkspaceRoleDataSeeder());

        base.OnModelCreating(modelBuilder);
    }
}