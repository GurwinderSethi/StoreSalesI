using System;
using System.Collections.Generic;

namespace StoreSalesInventory.Server.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
  //  public string ProductName { get; internal set; }
}
