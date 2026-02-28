using StoreSalesInventory.Server.Dtos.Store;  
using StoreSalesInventory.Server.Models;
namespace StoreSalesInventory.Server.Mappers
{
    public class StoreMapper
    {
        public Store MapToStoreModel(GetStoreDto getStoreDto)
        {
            return new Store
            {
                Id = getStoreDto.StoreId,
                Name = getStoreDto.StoreName,
                Address = getStoreDto.StoreAddress
            };
        }
        public static GetStoreDto MapToGetStoreDto(Store getstore)
        {
            return new GetStoreDto
            {
                StoreId = getstore.Id,
                StoreName = getstore.Name ?? string.Empty,
                StoreAddress = getstore.Address ?? string.Empty
            };
        }
        public static UpdateStoreDto MapToUpdateStoreDto(Store updateStore)
        {
            return new UpdateStoreDto
            {
                StoreId = updateStore.Id,
                StoreName = updateStore.Name ?? string.Empty,
                StoreAddress = updateStore.Address ?? string.Empty
            };
        }
        public static CreateStoreDto MapToCreateStoreDto(Store createStore)
        {
            return new CreateStoreDto
            {
                StoreName = createStore.Name ?? string.Empty,
                StoreAddress = createStore.Address ?? string.Empty
            };
        }

    }
}
