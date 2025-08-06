using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(
    Expression<Func<T, bool>> filter = null,
    Func<IQueryable<T>, IQueryable<T>> include = null,
    Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null);

        Task<T> GetByIdAsync(int id);
        Task<T> GetAsync(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IQueryable<T>> include = null
    );

        Task AddAsync(T entity);
        void Update(T entity);
        Task<int> DeleteAsync(int id);
        Task<int> DeleteAsync(T entity);
    }
}
