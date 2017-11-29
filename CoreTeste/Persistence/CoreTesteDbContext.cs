using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreTeste.Core.Models;

namespace CoreTeste.Persistence
{
    public class CoreTesteDbContext : DbContext
    {
        public DbSet<Model> Models { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public CoreTesteDbContext(DbContextOptions<CoreTesteDbContext> options)
            :base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //chave primária composta no modelo(classe) VehicleFeature. Fluent API
            modelBuilder.Entity<VehicleFeature>().HasKey(vf =>
              new { vf.VehicleId, vf.FeatureId });
        }
    }
}
