using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Business
{
    public class BusinessException : Exception
    {
        public BusinessException(string message) : base(message)
        {
        }

        public BusinessException(string message, Exception ex) : base(message)
        {
            //this.InnerException = ex;
        }
    }
}
