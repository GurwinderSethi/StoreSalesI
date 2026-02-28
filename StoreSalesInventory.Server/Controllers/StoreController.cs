using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreSalesInventory.Server.Dtos.Product;
using StoreSalesInventory.Server.Dtos.Store;
using StoreSalesInventory.Server.Mappers;
using StoreSalesInventory.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSalesInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly MvpcustomerSalesContext _context;

        public StoreController(MvpcustomerSalesContext context)
        {
            _context = context;
        }

        // GET: api/Store
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Store>>> GetStores()
        //{
        //    return await _context.Stores.ToListAsync();
        //}
        public async Task<ActionResult<IEnumerable<GetStoreDto>>> GetStores()
        {
            //  var stores = await _context.Stores.ToListAsync();
            var _stores = await _context.Stores.Select(s => StoreMapper.MapToGetStoreDto(s)).ToListAsync();
            if (_stores.Count > 0)
            {
                return Ok(_stores);
            }
            else
            {
                return BadRequest("There are no stores at the moment");
            }
        }

        // GET: api/Store/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetStoreDto>> GetStore(int id)
        {
            var store = await _context.Stores.FindAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return StoreMapper.MapToGetStoreDto(store);
        }

        // PUT: api/Store/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //public async Task<IActionResult> PutStore(int id, Store store)
        public async Task<IActionResult> PutStore(int id, UpdateStoreDto store)
        {
            if (id != store.StoreId)
            {
                return BadRequest();
            }
            var entity = new Store
            {
                Id = store.StoreId,
                Name = store.StoreName,
                Address = store.StoreAddress
            };

            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // return NoContent();
            return Ok(new UpdateStoreDto
            {
                StoreId = entity.Id,
                StoreName = entity.Name,
                StoreAddress = entity.Address
            });
        }

        // POST: api/Store
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(CreateStoreDto store)
        {
            var createStoreDto = new GetStoreDto
            {
                StoreId = 0,
                StoreName = store.StoreName,
                StoreAddress = store.StoreAddress
            };
            //var entity = new CreateStoreDto
            //{
            //    StoreName = createStoreDto.StoreName,
            //    StoreAddress = createStoreDto.StoreAddress
            //};
            var entity = new StoreMapper().MapToStoreModel(createStoreDto);


            _context.Stores.Add(entity);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetStore", new { id = entity.Store }, entity);
            return CreatedAtAction("GetStore", new { id = store.StoreId }, StoreMapper.MapToCreateStoreDto(entity));
        }

        // DELETE: api/Store/5
        [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteStore(int id)
        public async Task<IActionResult> DeleteStore(DeleteStoreDto dto)
        {
            var store = await _context.Stores.FindAsync(dto.StoreId);
            if (store == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}
