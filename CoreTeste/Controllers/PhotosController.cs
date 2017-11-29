using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using CoreTeste.Core.Models;
using CoreTeste.Core;
using AutoMapper;
using CoreTeste.Controllers.Resources;

namespace CoreTeste.Controllers
{

    ///api/vehicles/1/photos/1
    ///api/vehicles/1/photos

    //[Produces("application/json")]
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.host = host;
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public IHostingEnvironment HostingEnvironment { get; }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includedRelated: false);

            if (vehicle == null)
                return NotFound();



            //Multiples Files IFormCollection
           var uploadFolderPath =  Path.Combine(host.WebRootPath, "uploads");
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

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsyc();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

       
        }
    }
}