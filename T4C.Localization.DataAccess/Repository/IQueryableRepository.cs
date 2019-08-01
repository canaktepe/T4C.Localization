using System.Linq;
using T4C.Localization.Entities;

namespace T4C.Localization.DataAccess.Repository
{
    public interface IQueryableRepository<out T> where T : class, IEntity, new()
    {
        IQueryable<T> Table { get; }
    }
}
