using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Dtos
{
    public record class CreateTaskDto(string title, string description, DateTime? startDate, int priorityId, int? projectId, int creatorId, string workspaceId, int[] selectedUsers);

}
