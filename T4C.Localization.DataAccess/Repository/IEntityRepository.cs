using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using T4C.Localization.Entities;

namespace T4C.Localization.DataAccess.Repository
{
    public interface IEntityRepository<T>
        where T: class, IEntity, new()
    {
        List<T> GetAll(Expression<Func<T, bool>> filter = null);
        T Get(Expression<Func<T, bool>> filter);
        T Add(T entity);
        T Update(T entity);
        bool Delete(T entity);
    }
}