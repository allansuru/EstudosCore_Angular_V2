using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CoreTeste.Core;
using CoreTeste.Controllers.Resources;
using CoreTeste.Core.Models;
using Microsoft.EntityFrameworkCore;
using CoreTeste.Persistence;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreTeste.Controllers
{
  
    public class FeaturesController : Controller
    {

        private readonly CoreTesteDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(CoreTesteDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet("api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await context.Features
                 .ToListAsync();

            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
        }

    }
}
