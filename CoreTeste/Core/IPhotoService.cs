using CoreTeste.Core.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace CoreTeste.Core
{
    public interface IPhotoService
    {
         Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadFolderPath);
        // foda de usar o IFormFile que é específico do core, é que to gerando uma dependencia aqui!
    }


}
