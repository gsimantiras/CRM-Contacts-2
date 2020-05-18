using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data.Models;
using Data.Data;
using CRM.Business.Engines;

namespace CRM.Api_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly CRMContactsContext _context;

        public AddressController(CRMContactsContext context)
        {
            this._context = context;
        }

        // GET: api/Address
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddress()
        {
            using (AddressEngine engine = new AddressEngine(this._context))
                return Ok(await engine.GetAllAddresses());
        }

        // GET: api/Address/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(long id)
        {
            using (AddressEngine engine = new AddressEngine(this._context))
                return Ok(await engine.GetAddress(id));
        }

        // PUT: api/Address/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Address>> PutAddress(long id, Address address)
        {
            using (AddressEngine engine = new AddressEngine(this._context))
                return Ok(await engine.UpdateAddress(id, address));
        }

        //// GET: api/addressByUser/2
        //[HttpGet("{id}")]
        //[Route("GetUserAddrsses")]
        //public async Task<IEnumerable<Address>> GetUserAddrsses(long userId)
        //{
        //    using (AddressEngine engine = new AddressEngine(this._context))
        //        return await engine.GetUserAddrsses(userId);
        //}

        // POST: api/Address
        [HttpPost]
        public async Task PostAddress(Address address)
        {
            using (AddressEngine engine = new AddressEngine(this._context))
                await engine.CreateAddress(address);
        }

        // DELETE: api/Address/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAddress(long id)
        {
            using (AddressEngine engine = new AddressEngine(this._context))
                return Ok(engine.DeleteAddress(id));
        }

    }
}
