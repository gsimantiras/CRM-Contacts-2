using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CRM.Api_Core.Models.DTOs;
using Data.Models;
using Data.Data;
using CRM.Business.Engines;

namespace CRM.Api_Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CRMContactsContext _context;

        public UsersController(CRMContactsContext context)
        {
            this._context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            using (UserEngine engine = new UserEngine(this._context))
                return Ok(await engine.GetAllUsers());
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            using (UserEngine engine = new UserEngine(this._context))
                return Ok(await engine.GetUser(id));
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> PutUser(long id, User user)
        {
            using (UserEngine engine = new UserEngine(this._context))
                return Ok(await engine.UpdateUser(id, user));
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDto userDto)
        {
            User user = userDto.User;
            using (UserEngine engine = new UserEngine(this._context))
                return Ok(await engine.CreateUser(user));
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task DeleteUser(long id)
        {
            using (UserEngine engine = new UserEngine(this._context))
                await engine.DeleteUserById(id);
        }

    }
}
