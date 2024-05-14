namespace WebApplication1.Infrastructure.Entities
{
    public class WorkspaceUser
    {
        public int Id { get; set; }
        public int WorkSpaceId { get; set; }
        public int UserId { get; set; }
        public DateTime EntryDate { get; set; }
        public int RoleId { get; set; }
    }
}
