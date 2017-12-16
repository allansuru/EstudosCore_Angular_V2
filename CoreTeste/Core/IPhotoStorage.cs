using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreTeste.Core
{
    public interface IPhotoStorage
    {
         Task<string> StorePhotoAsync(string uploadFolderPatch, IFormFile file);
    }

    
}
