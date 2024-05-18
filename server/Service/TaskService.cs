using WebApplication1.Infrastructure.Entities;
using WebApplication1.Repositories;

namespace WebApplication1.Service
{
    public class TaskService(ITaskRepository taskRepository, ITaskResponsibleRepository taskResponsibleRepository) : ITaskService
    {
        public async Task<List<TaskEntity>> GetAll(string workspaceId)
        {
            return await taskRepository.GetAll(workspaceId);
        }

        public async Task<TaskEntity> Get(int taskId)
        {
            return await taskRepository.Get(taskId);
        }

        public async Task Delete(int taskId)
        {
            await taskResponsibleRepository.DeleteTaskResponsibles(taskId);

            await taskRepository.Delete(taskId);
        }

        public async Task<TaskEntity> Update()
        {
            return await taskRepository.Update();
        }

        public async Task<TaskEntity> Create(string title, string? description, int priorityId, DateTime createdDate, DateTime? startDate, int? projectId, int creatorId, string workspaceId, int[] selectedUsers)
        {
            TaskEntity task = await taskRepository.Create(title, description, priorityId, createdDate, startDate, projectId, creatorId, workspaceId);

            if (selectedUsers != null && selectedUsers.Length > 0)
            {
                await taskResponsibleRepository.AddTaskResponsibles(task.Id, selectedUsers);
            }

            return task;
        }
    }
}
