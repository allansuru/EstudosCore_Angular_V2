using CoreTeste.Core;
using CoreTeste.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreTeste.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly CoreTesteDbContext context;

        public PhotoRepository(CoreTesteDbContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos
       .Where(p => p.VehicleId == vehicleId)
       .ToListAsync();
        }
    }
}
