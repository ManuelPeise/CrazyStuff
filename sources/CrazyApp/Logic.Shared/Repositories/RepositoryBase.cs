using Data.ApplicationContext;
using Data.Entities;
using Logic.Shared.Interfaces;

namespace Logic.Shared.Repositories
{
    public class RepositoryBase<TEntity>: IRepositoryBase<TEntity> where TEntity : AEntity
    {
        private readonly AppDataContext _context;

        public RepositoryBase(AppDataContext context)
        {
            _context = context;
        }
    }
}
