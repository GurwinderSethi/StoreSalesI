namespace StoreSalesInventory.Server.Dtos.Product
{
    public class UpdateProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public decimal? ProductPrice { get; set; }
    }
}
