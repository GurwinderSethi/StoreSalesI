using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreSalesInventory.Server.Models;
using StoreSalesInventory.Server.Dtos.Product;
using StoreSalesInventory.Server.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;

namespace StoreSalesInventory.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MvpcustomerSalesContext _context;

        public ProductController(MvpcustomerSalesContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        //{
        //    return await _context.Products.ToListAsync();
        //}

        public async Task<ActionResult<IEnumerable<GetProductDto>>> GetProducts()
        {
            var _products = await _context.Products.Select(s => ProductMapper.MapToGetProductDto(s)).ToListAsync();

            if (_products.Count > 0)
            {
                return Ok(_products);
            }
            else
            {
                return BadRequest("There are no products at the moment");
            }

        }


        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetProductDto>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            // return product;
            return ProductMapper.MapToGetProductDto(product);
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        // public async Task<IActionResult> PutProduct(int id, GetProductDto product)
        public async Task<IActionResult> PutProduct(int id, UpdateProductDto product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }
            var entity = new Product
            {
                Id = product.ProductId,
                Name = product.ProductName,
                Price = product.ProductPrice
            };
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // return NoContent(); 
            //  return Ok(ProductMapper.MapToGetProductDto(entity));
            return Ok(new UpdateProductDto
            {
                ProductId = entity.Id,
                ProductName = entity.Name,
                ProductPrice = entity.Price
            });
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        // public async Task<ActionResult<GetProductDto>> PostProduct(GetProductDto product)
        public async Task<ActionResult<CreateProductDto>> PostProduct(CreateProductDto product)
        {
            var getProductDto = new GetProductDto
            {
                ProductId = 0,
                ProductName = product.ProductName,
                ProductPrice = product.ProductPrice
            };
            var entity = new ProductMapper().MapToProductModel(getProductDto);
            //var createProductDto = new CreateProductDto
            //{
            //    ProductId = 0,
            //    ProductName = product.ProductName,
            //    ProductPrice = product.ProductPrice
            //};
            //var getProductDto = new GetProductDto
            //{
            //    ProductId = createProductDto.ProductId,
            //    ProductName = createProductDto.ProductName,
            //    ProductPrice = createProductDto.ProductPrice
            //};
           // var entity = new ProductMapper().MapToProductModel(getProductDto);

            _context.Products.Add(entity);
            await _context.SaveChangesAsync();

             return CreatedAtAction("GetProduct", new { id = product.ProductId }, ProductMapper.MapToCreateProductDto(entity));
           // return CreatedAtAction("GetProduct", new { id = entity.Id }, ProductMapper.MapToCreateProductDto(entity));
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteProduct(int id)
        public async Task<IActionResult> DeleteProduct(DeleteProductDto dto)
        {
            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
