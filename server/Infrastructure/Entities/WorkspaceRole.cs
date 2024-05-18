using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Infrastructure.Entities
{
    public class WorkspaceRole
    {  
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
