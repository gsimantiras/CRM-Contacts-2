using Data.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Business.Engines
{
    public class BaseEngine : IDisposable
    {
        internal CRMContactsContext _context;

        public BaseEngine(CRMContactsContext context)
        {
            this._context = context;
        }

        public void Dispose()
        {
            this._context.Dispose();
        }
    }
}
