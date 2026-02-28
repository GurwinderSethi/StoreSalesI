using StoreSalesInventory.Server.Dtos.Customer;
using StoreSalesInventory.Server.Models;
namespace StoreSalesInventory.Server.Mappers
{
    public class CustomerMapper
    {
        public Customer MapToCustomerModel(GetCustomerDto getCustomerDto)
        {
            return new Customer
            {
                Id = getCustomerDto.CustomerId,
                Name = getCustomerDto.CustomerName,
                Address = getCustomerDto.CustomerAddress
            };
        }
        public static GetCustomerDto MapToGetCustomerDto(Customer getcustomer)
        {
            return new GetCustomerDto
            {
                CustomerId = getcustomer.Id,
                CustomerName = getcustomer.Name ?? string.Empty,
                CustomerAddress = getcustomer.Address ?? string.Empty
            };
        }  
        public static UpdateCustomerDto MapToUpdateCustomerDto(UpdateCustomerDto updateCustomerDto)
        {
            return new UpdateCustomerDto
            {
                CustomerAddress = updateCustomerDto.CustomerAddress,
                CustomerName = updateCustomerDto.CustomerName,
                CustomerId = updateCustomerDto.CustomerId
            };
        }
        public static DeleteCustomerDto MapToDeleteCustomerDto( DeleteCustomerDto deleteCustomerDto)
        {
            return new DeleteCustomerDto
            {
                CustomerId = deleteCustomerDto.CustomerId
            };
        }
    }
}
