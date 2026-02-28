namespace StoreSalesInventory.Server.Dtos.Store
{
    public class GetStoreDto
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; } = null!;
        public string? StoreAddress { get; set; }
    }
}
