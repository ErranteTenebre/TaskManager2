namespace WebApplication1.Infrastructure.Entities
{
    public class TaskEntity
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public int? PriorityId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? StartDate { get; set; }
        public int? ProjectId { get; set; }
        public int? RootTaskId { get; set; }
        public int WorkspaceId { get; set; }
    }
}
