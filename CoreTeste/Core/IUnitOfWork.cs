using System.Threading.Tasks;

namespace CoreTeste.Core
{

    public interface IUnitOfWork
    {
        Task CompleteAsyc();
    }
}
