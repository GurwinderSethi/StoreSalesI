namespace StoreSalesInventory.Server.Dtos.Product
{
    public class GetProductDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; } 
        public decimal? ProductPrice { get; set; }
    }
}
