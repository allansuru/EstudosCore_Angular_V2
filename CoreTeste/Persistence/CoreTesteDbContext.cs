using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreTeste.Persistence
{
    public class CoreTesteDbContext : DbContext
    {
        public CoreTesteDbContext(DbContextOptions<CoreTesteDbContext> options)
            :base(options)
        {

        }
    }
}
