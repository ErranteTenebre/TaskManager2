namespace WebApplication1.Infrastructure.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? StartDate { get; set; }
        public int CreatorId { get; set; }
        public int? PriorityId { get; set; }
        public int WorkspaceId { get; set; }
    }
}
