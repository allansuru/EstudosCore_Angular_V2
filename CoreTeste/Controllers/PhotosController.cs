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
using Microsoft.Extensions.Options;

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
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepository;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoService photoService;

        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepository,  IMapper mapper, IPhotoRepository photoRepository ,IOptionsSnapshot<PhotoSettings> options, IPhotoService photoService )
        {
            this.host = host;
            this.vehicleRepository = vehicleRepository;
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
            this.photoSettings = options.Value;
        }

        

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includedRelated: false);

            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file is 10mb");
            if (!photoSettings.isSupported(file.FileName)) return BadRequest("Invalid file type");

            //Multiples Files IFormCollection
            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");

            var photo = await photoService.UploadPhoto(vehicle, file, uploadFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

       
        }
        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }
    }
}