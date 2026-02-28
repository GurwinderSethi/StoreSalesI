using StoreSalesInventory.Server.Dtos.Sale;
using StoreSalesInventory.Server.Models;
namespace StoreSalesInventory.Server.Mappers
{
    public class SaleMapper
    {
        public Sale MapToSaleModel(GetSaleDto getSaleDto)
        {
            return new Sale
            {
                Id = getSaleDto.SaleId,
                ProductId = getSaleDto.Product_Id,
                CustomerId = getSaleDto.Customer_Id,
                StoreId = getSaleDto.Store_Id,
                DateSold = getSaleDto.DateSold,
               // CustomerName = getSaleDto.CustomerName,
               // Product_Name = getSaleDto.ProductName,
               // StoreName = getSaleDto.StoreName
            };
        }
        public static GetSaleDto MapToGetSaleDto(Sale getsale)
        {
            return new GetSaleDto
            {
                SaleId = getsale.Id,
                Product_Id = getsale.ProductId ?? 0,
                Customer_Id = getsale.CustomerId ?? 0,
                Store_Id = getsale.StoreId ?? 0,
                DateSold = getsale.DateSold ?? DateTime.MinValue,
                CustomerName = getsale.Customer?.Name,
                ProductName = getsale.Product?.Name,
                StoreName = getsale.Store?.Name
            };
        }
        public static CreateSaleDto MapToCreateSaleDto(Sale sale)
        {
            return new CreateSaleDto
            {
                SaleId = sale.Id,
                Product_Id = sale.ProductId ?? 0,
                Customer_Id = sale.CustomerId ?? 0,
                Store_Id = sale.StoreId ?? 0,
                DateSold = sale.DateSold ?? DateTime.MinValue,
                CustomerName = sale.Customer?.Name,
                ProductName = sale.Product?.Name,
                StoreName = sale.Store?.Name
            };
        }
        
      public static UpdateSaleDto MapToUpdateSaleDto(Sale sale)
        {
            return new UpdateSaleDto
            {
                SaleId = sale.Id,
                Product_Id = sale.ProductId ?? 0,
                Customer_Id = sale.CustomerId ?? 0,
                Store_Id = sale.StoreId ?? 0,
                DateSold = sale.DateSold ?? DateTime.MinValue,
                CustomerName = sale.Customer?.Name,
                ProductName = sale.Product?.Name,
                StoreName = sale.Store?.Name
            };
        }

        public static DeleteSaleDto MapToDeleteSaleDto(Sale sale) {
            return new DeleteSaleDto
            {
                SaleId = sale.Id,
                Product_Id = sale.ProductId ?? 0,
                Customer_Id = sale.CustomerId ?? 0,
                Store_Id = sale.StoreId ?? 0,
                DateSold = sale.DateSold ?? DateTime.MinValue,
                CustomerName = sale.Customer?.Name,
                ProductName = sale.Product?.Name,
                StoreName = sale.Store?.Name
            };
        }

    }
}
