using Data.Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Engines
{
    public class AddressEngine : BaseEngine
    {
        public AddressEngine(CRMContactsContext context) : base(context) { }

        public async Task<Address> GetAddress(long id)
        {
            var address = await this._context.Addresses
                .FindAsync(id);

            if (address is null)
                throw new BusinessException(ErrorCodes.AddressNotFound);

            return address;
        }

        public async Task<Address> CreateAddress(Address address)
        {
            using (UserEngine userEngine = new UserEngine(this._context))
            {
                if (!userEngine.UserExists(address.UserId))
                {
                    throw new BusinessException(ErrorCodes.UserNotFound);
                }
                await this._context.Addresses.AddAsync(address);
                await this._context.SaveChangesAsync();

                return address;
            }
        }

        public async Task<IEnumerable<Address>> GetAllAddresses()
        {
            return await this._context.Addresses.ToListAsync();
        }

        public async Task<IEnumerable<Address>> GetUserAddrsses(long userId)
        {
            using (UserEngine userEngine = new UserEngine(this._context))
            {
                if (!userEngine.UserExists(userId))
                {
                    throw new BusinessException(ErrorCodes.UserNotFound);
                }
                return await this._context.Addresses.Where(a => a.UserId == userId).ToListAsync();
            }
        }

        public Task DeleteAddress(long id)
        {
            throw new BusinessException(ErrorCodes.MethodNotAllowed);
        }

        public Task<Address> UpdateAddress(long id, Address address)
        {
            throw new BusinessException(ErrorCodes.MethodNotAllowed);
        }

    }
}
