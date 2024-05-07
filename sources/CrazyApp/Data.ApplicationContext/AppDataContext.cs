using Microsoft.EntityFrameworkCore;

namespace Data.ApplicationContext
{
    public class AppDataContext: DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> opt) : base(opt) { }
    }
}
