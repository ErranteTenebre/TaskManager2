namespace WebApplication1.Repositories
{
    public interface ITaskResponsibleRepository
    {
        Task AddTaskResponsibles(int taskId, int[] userIds);

        Task DeleteTaskResponsibles(int taskId);
    }
}
