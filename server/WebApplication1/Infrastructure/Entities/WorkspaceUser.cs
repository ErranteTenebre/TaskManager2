namespace WebApplication1.Infrastructure.Entities
{
    public class WorkspaceUser
    {
        public int Id { get; set; }
        public string WorkSpaceId { get; set; }
        public int UserId { get; set; }
        // public DateTime EntryDate { get; set; }
        // public int RoleId { get; set; }

        public virtual User User { get; set; }
        public virtual Workspace Workspace { get; set; }
    }
}
