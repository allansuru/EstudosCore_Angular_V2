using CoreTeste.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreTeste.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}
