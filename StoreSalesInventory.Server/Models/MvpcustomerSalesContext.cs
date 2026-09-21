using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace StoreSalesInventory.Server.Models;

public partial class MvpcustomerSalesContext : DbContext
{
    public MvpcustomerSalesContext()
    {
    }

    public MvpcustomerSalesContext(DbContextOptions<MvpcustomerSalesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Sale> Sales { get; set; }

    public virtual DbSet<Store> Stores { get; set; }

   

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.ToTable("Customer");

            entity.Property(e => e.Address).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Product");

            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.Price).HasColumnType("money");
        });

        modelBuilder.Entity<Sale>(entity =>
        {
            entity.Property(e => e.DateSold).HasColumnType("datetime");

            entity.HasOne(d => d.Customer).WithMany(p => p.Sales)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_Sales_Customer");

            entity.HasOne(d => d.Product).WithMany(p => p.Sales)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_Sales_Product");

            entity.HasOne(d => d.Store).WithMany(p => p.Sales)
                .HasForeignKey(d => d.StoreId)
                .HasConstraintName("FK_Sales_Store");
        });

        modelBuilder.Entity<Store>(entity =>
        {
            entity.ToTable("Store");

            entity.Property(e => e.Address).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
