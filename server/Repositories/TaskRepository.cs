using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public class TaskRepository(TasksDbContext dbContext) : ITaskRepository
    {
        public async Task<List<TaskEntity>> GetAll(string workspaceId)
        {
            return await dbContext.Tasks
                .Where(t => t.WorkspaceId == workspaceId)
                .ToListAsync();
        }

        public async Task<TaskEntity> Get(int taskId)
        {
            return await dbContext.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId);
        }

        public async Task Delete(int taskId)
        {
            var task = await dbContext.Tasks.FindAsync(taskId);
            if (task != null)
            {
                dbContext.Tasks.Remove(task);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task<TaskEntity> Update()
        {
            throw new NotImplementedException();
        }

        public async Task<TaskEntity> Create(string title, string? description, int priorityId, DateTime createdDate, DateTime? startDate, int? projectId, int creatorId, string workspaceId)
        {
            var task = new TaskEntity
            {
                Title = title,
                Description = description,
                PriorityId = priorityId,
                CreatedDate = createdDate,
                StartDate = startDate,
                ProjectId = projectId,
                CreatorId = creatorId,
                WorkspaceId = workspaceId,
                StageId = 1,
            };

            dbContext.Tasks.Add(task);
            await dbContext.SaveChangesAsync();

            return task;
        }
    }
}
