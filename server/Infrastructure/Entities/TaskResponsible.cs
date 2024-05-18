namespace WebApplication1.Infrastructure.Entities
{
    public class TaskResponsible
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }
        public virtual User Responsible { get; set; }
    }
}
