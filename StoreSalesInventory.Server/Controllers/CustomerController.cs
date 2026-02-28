using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreSalesInventory.Server.Models;
using StoreSalesInventory.Server.Dtos.Customer;
using StoreSalesInventory.Server.Mappers;

namespace StoreSalesInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly MvpcustomerSalesContext _context;

        public CustomerController(MvpcustomerSalesContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCustomerDto>>> GetCustomers()
        {
            var _customer = await _context.Customers.Select(s => CustomerMapper.MapToGetCustomerDto(s)).ToListAsync();
           if (_customer.Count > 0)
            {
                return Ok(_customer);
            }
            else
            {
                return BadRequest("There are no customers at the moment");
            }

           // return await _context.Customers.ToListAsync();
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetCustomerDto>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return CustomerMapper.MapToGetCustomerDto(customer);
        }

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, UpdateCustomerDto customer)
        {
            if (id != customer.CustomerId)
            {
                return BadRequest();
            }
            var entity = new Customer
            {
                Id = customer.CustomerId,
                Name = customer.CustomerName,
                Address = customer.CustomerAddress
            };
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

           // return NoContent();
           return Ok(new UpdateCustomerDto
           {
               CustomerId = entity.Id,
               CustomerName = entity.Name,
               CustomerAddress = entity.Address
           });
        }

        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CreateCustomerDto>> PostCustomer(CreateCustomerDto customer)
        {
            var entity = new Customer
            {
                Name = customer.CustomerName,
                Address = customer.CustomerAddress
            };

            //{
            //    CustomerId = 0,
            //    CustomerName = customer.CustomerName,
            //    CustomerAddress = customer.CustomerAddress

            //});
            _context.Customers.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteCustomer(int id)
          public async Task<IActionResult> DeleteCustomer(DeleteCustomerDto dto)
        
           {
            //var customer = await _context.Customers.FindAsync(id);
            var customer = await _context.Customers.FindAsync(dto.CustomerId);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}
