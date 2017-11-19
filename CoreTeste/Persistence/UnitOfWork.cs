using CoreTeste.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreTeste.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CoreTesteDbContext context;

        public UnitOfWork(CoreTesteDbContext context)
        {
            this.context = context;
        }
        public Task CompleteAsyc()
        {
            throw new NotImplementedException();
        }
    }
}
