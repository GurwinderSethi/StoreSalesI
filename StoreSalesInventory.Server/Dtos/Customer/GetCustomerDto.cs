namespace StoreSalesInventory.Server.Dtos.Customer
{
    public class GetCustomerDto
    {
        public int CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerAddress{ get; set; }
    }

    //public Customer MapToCustomerModel(GetCustomerDto getCustomerDto)
    //{
    //    return new Customer
    //    {
    //        Id = getCustomerDto.CustomerId,
    //        Name = getCustomerDto.CustomerName,
    //        Address = getCustomerDto.CustomerEmail
    //    };
    //}
}
