﻿using CoreTeste.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CoreTeste.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includedRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);

        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}
