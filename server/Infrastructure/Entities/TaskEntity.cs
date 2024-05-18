namespace WebApplication1.Infrastructure.Entities
{
    public class TaskEntity
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int PriorityId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? StartDate { get; set; }
        public int? ProjectId { get; set; }
        public int StageId { get; set; }
        public required string WorkspaceId { get; set; }
        public int CreatorId { get; set; }

        public virtual User Creator { get; set; }
        public virtual Workspace Workspace { get; set; }
        public virtual Project? Project { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual TaskStageEntity Stage { get; set; }
        public virtual List<TaskResponsible> TaskResponsibles { get; set; }
    }
}
