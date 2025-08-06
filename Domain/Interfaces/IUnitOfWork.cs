using Microsoft.EntityFrameworkCore.Storage;

namespace Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        IRepository<T> GetRepository<T>() where T : class;

        Task CommitAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}
