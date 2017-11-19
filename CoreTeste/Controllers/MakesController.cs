using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CoreTeste.Persistence;
using CoreTeste.Controllers.Resources;
using Microsoft.EntityFrameworkCore;
using CoreTeste.Core.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreTeste.Controllers
{
    public class MakesController : Controller
    {
        private readonly CoreTesteDbContext context;
        private readonly IMapper mapper;
        public MakesController(CoreTesteDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet("api/makes")] //MARCA DO CARRO 
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            try
            {
                var makes = await context.Makes.Include(m => m.Models)
                    .ToListAsync();

   

                return mapper.Map<List<Make>, List<MakeResource>>(makes);
            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
        }
    }
}
