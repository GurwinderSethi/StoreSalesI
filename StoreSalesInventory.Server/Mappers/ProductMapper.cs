using StoreSalesInventory.Server.Dtos.Product;
using StoreSalesInventory.Server.Models;
namespace StoreSalesInventory.Server.Mappers
{
    public class ProductMapper
    {
        public Product MapToProductModel(GetProductDto getProductDto)
        {
            return new Product
            {
                Id = getProductDto.ProductId,
                Name = getProductDto.ProductName,
                Price = getProductDto.ProductPrice
            };
        }
        public static GetProductDto MapToGetProductDto(Product getproduct)
        {
            return new GetProductDto
            {
                ProductId = getproduct.Id,
                ProductName = getproduct.Name ?? string.Empty,
                ProductPrice = getproduct.Price
            };
        }
        public static UpdateProductDto MapToUpdateProductDto(UpdateProductDto updateProductDto)
        {
            return new UpdateProductDto
            {
                ProductId = updateProductDto.ProductId,
                ProductName = updateProductDto.ProductName,
                ProductPrice = updateProductDto.ProductPrice
            };
        }
        public static CreateProductDto MapToCreateProductDto(Product product)
        {
            return new CreateProductDto
            {
                ProductName = product.Name,
                ProductPrice = product.Price
            };
        }

        public static DeleteProductDto MapToDeleteProductDto(Product deleteProduct)
        {
            return new DeleteProductDto
            {
                ProductId = deleteProduct.Id
            };
        }
    }
}
