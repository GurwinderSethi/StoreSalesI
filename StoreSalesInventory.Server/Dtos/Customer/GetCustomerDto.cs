namespace StoreSalesInventory.Server.Dtos.Customer
{
    public class GetCustomerDto
    {
        public int CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerAddress{ get; set; }
    }

}
