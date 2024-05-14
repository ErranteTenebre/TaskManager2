namespace WebApplication1.Infrastructure.Entities
{
    public class Workspace
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }
        public int CreatorId { get; set; }
    }
}
