using Data.Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Business.Engines
{
    public class UserEngine : BaseEngine
    {
        public UserEngine(CRMContactsContext context) : base(context) { }

        public async Task<User> GetUser(long id)
        {
             User user = await this._context.Users
                                  .Include(u => u.ContactInformation)
                                  .Include(u => u.Addresses)
                                  .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null)
                throw new BusinessException(ErrorCodes.UserNotFound);

            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            try
            {
                this._context.Users.Add(user);
                await this._context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw new BusinessException(ErrorCodes.UserNotCreated, ex);
            }
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await this._context.Users
               .Include(u => u.ContactInformation)
               .Include(u => u.Addresses)
               .ToListAsync();
        }

        public async Task DeleteUserById(long id)
        {
            User user = await GetUser(id);
            await DeleteUser(user);
        }

        internal async Task DeleteUser(User user)
        {
            try
            {
                foreach (var item in user.Addresses)
                {
                    this._context.Remove(item);
                }
                this._context.Remove(user.ContactInformation);
                this._context.Remove(user);

                await this._context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new BusinessException(ErrorCodes.UserNotDeleted, ex);
            }
        }

        public Task<User> UpdateUser(long id, User user)
        {
            throw new BusinessException(ErrorCodes.MethodNotAllowed);
        }

        internal bool UserExists(long userId)
        {
            User user = this._context.Users.Find(userId);
            return (user != null);
        }

    }
}
