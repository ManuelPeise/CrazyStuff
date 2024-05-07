using System.ComponentModel.DataAnnotations;

namespace Data.Entities
{
    public abstract class AEntity
    {
        [Key]
        public int Id { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
