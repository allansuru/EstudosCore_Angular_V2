using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CoreTeste.Core
{
    public class FileSystenPhotoStorage : IPhotoStorage
    {
        public async Task<string> StorePhotoAsync(string uploadFolderPath, IFormFile file)
        {

            // c:\wwwroot\
            if (!Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            //modificar o nome do fileUpload, é uma pratica contra hacker

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }


    }
}
