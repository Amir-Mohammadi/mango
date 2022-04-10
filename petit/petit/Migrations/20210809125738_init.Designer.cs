﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using core.Data;

namespace petit.Migrations
{
  [DbContext(typeof(ApplicationDbContext))]
  [Migration("20210809125738_init")]
  partial class Init
  {
    protected override void BuildTargetModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
      modelBuilder
          .HasAnnotation("Relational:MaxIdentifierLength", 128)
          .HasAnnotation("ProductVersion", "5.0.6")
          .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

      modelBuilder.Entity("petit.Domains.Files.File", b =>
          {
            b.Property<Guid>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("uniqueidentifier");

            b.Property<string>("FileName")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<byte[]>("FileStream")
                      .IsRequired()
                      .HasColumnType("varbinary(max)");

            b.Property<string>("FileType")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<byte[]>("RowVersion")
                      .IsConcurrencyToken()
                      .IsRequired()
                      .ValueGeneratedOnAddOrUpdate()
                      .HasColumnType("rowversion");

            b.HasKey("Id");

            b.ToTable("Files");
          });

      modelBuilder.Entity("petit.Domains.Shop.Country", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<string>("Code")
                      .IsRequired()
                      .HasMaxLength(50)
                      .HasColumnType("nvarchar(50)");

            b.Property<string>("Culture")
                      .IsRequired()
                      .HasMaxLength(5)
                      .HasColumnType("nvarchar(5)");

            b.Property<string>("Name")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<byte[]>("RowVersion")
                      .IsConcurrencyToken()
                      .IsRequired()
                      .ValueGeneratedOnAddOrUpdate()
                      .HasColumnType("rowversion");

            b.HasKey("Id");

            b.ToTable("Countries");
          });

      modelBuilder.Entity("petit.Domains.Shop.Customer", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<string>("Code")
                      .HasColumnType("nvarchar(max)");

            b.Property<int>("CountryId")
                      .HasColumnType("int");

            b.Property<string>("Email")
                      .IsRequired()
                      .HasColumnType("nvarchar(450)");

            b.Property<string>("FirstName")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("LastName")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Phone")
                      .IsRequired()
                      .HasColumnType("nvarchar(450)");

            b.Property<byte[]>("RowVersion")
                      .IsConcurrencyToken()
                      .IsRequired()
                      .ValueGeneratedOnAddOrUpdate()
                      .HasColumnType("rowversion");

            b.Property<int>("UserId")
                      .HasColumnType("int");

            b.HasKey("Id");

            b.HasIndex("CountryId");

            b.HasIndex("Email")
                      .IsUnique();

            b.HasIndex("UserId")
                      .IsUnique();

            b.HasIndex("Phone", "CountryId")
                      .IsUnique();

            b.ToTable("Customers");
          });

      modelBuilder.Entity("petit.Domains.Users.User", b =>
          {
            b.Property<int>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("int")
                      .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            b.Property<byte[]>("RowVersion")
                      .IsConcurrencyToken()
                      .IsRequired()
                      .ValueGeneratedOnAddOrUpdate()
                      .HasColumnType("rowversion");

            b.Property<byte>("UserRole")
                      .HasColumnType("tinyint");

            b.HasKey("Id");

            b.ToTable("Users");
          });

      modelBuilder.Entity("petit.Domains.Shop.Customer", b =>
          {
            b.HasOne("petit.Domains.Shop.Country", "Country")
                      .WithMany()
                      .HasForeignKey("CountryId")
                      .OnDelete(DeleteBehavior.Restrict)
                      .IsRequired();

            b.HasOne("petit.Domains.Users.User", "User")
                      .WithOne()
                      .HasForeignKey("petit.Domains.Shop.Customer", "UserId")
                      .OnDelete(DeleteBehavior.Restrict)
                      .IsRequired();

            b.Navigation("Country");

            b.Navigation("User");
          });
#pragma warning restore 612, 618
    }
  }
}
