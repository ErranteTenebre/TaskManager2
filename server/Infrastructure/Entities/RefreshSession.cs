namespace WebApplication1.Infrastructure.Entities
{
    public class RefreshSession
    {
        public int Id { get; set; }
        public int UserId { get;    set; }
        public string RefreshToken { get; set; }
        public string FingerPrint { get; set; }

        public virtual User User { get; set; }
    }
}
