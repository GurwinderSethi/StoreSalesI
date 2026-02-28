using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreSalesInventory.Server.Models;
using StoreSalesInventory.Server.Dtos.Sale; 
using StoreSalesInventory.Server.Mappers;



namespace StoreSalesInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly MvpcustomerSalesContext _context;

        public SaleController(MvpcustomerSalesContext context)
        {
            _context = context;
        }

        // GET: api/Sale
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        //{
        //    return await _context.Sales.ToListAsync();
        //}

        public async Task<ActionResult<IEnumerable<GetSaleDto>>> GetSales()
        {
            var _sales = await _context.Sales
                .Join(_context.Customers,
                    sale => sale.CustomerId,
                    customer => customer.Id,
                    (sale, customer) => new
                    {
                        SaleId = sale.Id,
                        CustomerId = customer.Id,
                        ProductId = sale.ProductId,
                        StoreId = sale.StoreId,
                        CustomerName = customer.Name,
                        DateSold = sale.DateSold ?? DateTime.MinValue // Fix for CS8629
                    })
                .Join(_context.Products,
                    salesCustomer => salesCustomer.ProductId,
                    product => product.Id,
                    (salesCustomer, product) => new 
                    {
                        Sale_Id = salesCustomer.SaleId,
                        Customer_Id = salesCustomer.CustomerId,
                        Product_Id = salesCustomer.ProductId,
                        Store_id = salesCustomer.StoreId,
                        CustomerName = salesCustomer.CustomerName,
                        DateSold = salesCustomer.DateSold,
                        ProductName = product.Name
                    })
                .Join(_context.Stores,
                    salesCustomerProduct => salesCustomerProduct.Store_id,
                    store => store.Id,
                    (salesCustomerProduct, store) => new 
                    {
                        SaleId = salesCustomerProduct.Sale_Id,
                        Customer_Id = salesCustomerProduct.Customer_Id,
                        Product_Id = salesCustomerProduct.Product_Id,
                        Store_Id = store.Id,
                        CustomerName = salesCustomerProduct.CustomerName,
                        DateSold = salesCustomerProduct.DateSold,
                        ProductName = salesCustomerProduct.ProductName,
                        StoreName = store.Name
                    })
                .ToListAsync();
            if (_sales.Count > 0)
            {
                return Ok(_sales);
            }
            else
            {
                return BadRequest("There are no sales at the moment");
            }
        }
        
        // GET: api/Sale/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetSaleDto>> GetSale(int id)
        {
            var _sale = await _context.Sales
                 .Join(_context.Customers,
                     sale => sale.CustomerId,
                     customer => customer.Id,
                     (sale, customer) => new
                     {
                         SaleId = sale.Id,
                         CustomerId = customer.Id,
                         ProductId = sale.ProductId,
                         StoreId = sale.StoreId,
                         CustomerName = customer.Name,
                         DateSold = sale.DateSold ?? DateTime.MinValue // Fix for CS8629
                     })
                 .Join(_context.Products,
                     salesCustomer => salesCustomer.ProductId,
                     product => product.Id,
                     (salesCustomer, product) => new
                     {
                         Sale_Id = salesCustomer.SaleId,
                         Customer_Id = salesCustomer.CustomerId,
                         Product_Id = salesCustomer.ProductId,
                         Store_id = salesCustomer.StoreId,
                         CustomerName = salesCustomer.CustomerName,
                         DateSold = salesCustomer.DateSold,
                         ProductName = product.Name
                     })
                 .Join(_context.Stores,
                     salesCustomerProduct => salesCustomerProduct.Store_id,
                     store => store.Id,
                     (salesCustomerProduct, store) => new
                     {
                         SaleId = salesCustomerProduct.Sale_Id,
                         Customer_Id = salesCustomerProduct.Customer_Id,
                         Product_Id = salesCustomerProduct.Product_Id,
                         Store_Id = store.Id,
                         CustomerName = salesCustomerProduct.CustomerName,
                         DateSold = salesCustomerProduct.DateSold,
                         ProductName = salesCustomerProduct.ProductName,
                         StoreName = store.Name
                     }).FirstOrDefaultAsync(s => s.SaleId == id);

            if (_sale == null)
            {
                return NotFound();
            }

            var saleDto = new GetSaleDto
            {
                SaleId = _sale.SaleId,
                Customer_Id = _sale.Customer_Id,
                Product_Id = _sale.Product_Id ?? 0,
                Store_Id = _sale.Store_Id,
                CustomerName = _sale.CustomerName,
                DateSold = _sale.DateSold,
                ProductName = _sale.ProductName,
                StoreName = _sale.StoreName
            };

            return Ok(saleDto);
        }

        // PUT: api/Sale/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //public async Task<IActionResult> PutSale(int id, Sale sale)
        public async Task<IActionResult> PutSale(int id, UpdateSaleDto sale)
        {
            if (id != sale.SaleId)
            {
                return BadRequest();
            }
            var entity= new Sale
            {
                Id = sale.SaleId,
                CustomerId = sale.Customer_Id,
                ProductId = sale.Product_Id,
                StoreId = sale.Store_Id,
                DateSold = sale.DateSold
            };
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return NoContent();
            return Ok(SaleMapper.MapToUpdateSaleDto(entity));
        }

        // POST: api/Sale
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CreateSaleDto>> PostSale(CreateSaleDto sale)
        {
            var createSaleDto = new GetSaleDto
            {
                SaleId = 0,
                Customer_Id = sale.Customer_Id,
                Product_Id = sale.Product_Id,
                Store_Id = sale.Store_Id,
                DateSold = sale.DateSold,
                CustomerName = sale.CustomerName,
                ProductName = sale.ProductName,
                StoreName = sale.StoreName
            };
            var entity = new SaleMapper().MapToSaleModel(createSaleDto);
            _context.Sales.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = sale.SaleId },SaleMapper.MapToCreateSaleDto(entity));
        }

        // DELETE: api/Sale/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(DeleteSaleDto dto)
        {
            var sale = await _context.Sales.FindAsync(dto.SaleId);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
