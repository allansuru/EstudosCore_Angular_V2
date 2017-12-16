using CoreTeste.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreTeste.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using CoreTeste.Extensions;

namespace CoreTeste.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly CoreTesteDbContext context;
        public VehicleRepository(CoreTesteDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includedRelated = true)
        {
            if (!includedRelated)
                return await context.Vehicles.FindAsync(id);


            return await context.Vehicles
                 .Include(v => v.Features)
                   .ThenInclude(vf => vf.Feature)
                 .Include(v => v.Model)
                   .ThenInclude(m => m.Make)
                 .SingleOrDefaultAsync(v => v.Id == id);

        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

     

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();

            


            var query = context.Vehicles
         .Include(v => v.Model)
           .ThenInclude(m => m.Make)
           .AsQueryable();


            query = query.ApplyFiltering(queryObj);


             var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {

                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName


            };

         
            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items =  await query.ToListAsync();

            return result;
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
    }
}
