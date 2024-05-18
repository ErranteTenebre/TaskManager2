using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Repositories
{
    public class TaskResponsibleRepository(TasksDbContext dbContext) : ITaskResponsibleRepository
    {
        public async Task AddTaskResponsibles(int taskId, int[] userIds)
        {
            foreach (int userId in userIds)
            {
                TaskResponsible taskResponsible = new TaskResponsible
                {
                    TaskId = taskId,
                    UserId = userId
                };
                dbContext.TasksResponsibles.Add(taskResponsible);
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteTaskResponsibles(int taskId)
        {
            await dbContext.TasksResponsibles
                .Where(ent => ent.TaskId == taskId)
                .ExecuteDeleteAsync();

             await dbContext.SaveChangesAsync();
        }
    }
}
