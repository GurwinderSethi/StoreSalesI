namespace StoreSalesInventory.Server.Dtos.Sale
{
    public class GetSaleDto
    {
        public int SaleId { get; set; }
        public int Product_Id { get; set; }
        public int Customer_Id { get; set; }
        public int Store_Id { get; set; }
        public DateTime DateSold { get; set; }

        public required string CustomerName { get; set; }
        public required string ProductName { get; set; }
        public required string StoreName { get; set; }
    }
}
