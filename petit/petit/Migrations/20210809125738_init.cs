using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace petit.Migrations
{
  public partial class Init : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "Countries",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Culture = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
            RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Countries", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "Files",
          columns: table => new
          {
            Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            FileType = table.Column<string>(type: "nvarchar(max)", nullable: false),
            FileStream = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
            RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Files", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "Users",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            UserRole = table.Column<byte>(type: "tinyint", nullable: false),
            RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Users", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "Customers",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
            Phone = table.Column<string>(type: "nvarchar(450)", nullable: false),
            FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
            UserId = table.Column<int>(type: "int", nullable: false),
            CountryId = table.Column<int>(type: "int", nullable: false),
            RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Customers", x => x.Id);
            table.ForeignKey(
                      name: "FK_Customers_Countries_CountryId",
                      column: x => x.CountryId,
                      principalTable: "Countries",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                      name: "FK_Customers_Users_UserId",
                      column: x => x.UserId,
                      principalTable: "Users",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
          });

      migrationBuilder.CreateIndex(
          name: "IX_Customers_CountryId",
          table: "Customers",
          column: "CountryId");

      migrationBuilder.CreateIndex(
          name: "IX_Customers_Email",
          table: "Customers",
          column: "Email",
          unique: true);

      migrationBuilder.CreateIndex(
          name: "IX_Customers_Phone_CountryId",
          table: "Customers",
          columns: new[] { "Phone", "CountryId" },
          unique: true);

      migrationBuilder.CreateIndex(
          name: "IX_Customers_UserId",
          table: "Customers",
          column: "UserId",
          unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Customers");

      migrationBuilder.DropTable(
          name: "Files");

      migrationBuilder.DropTable(
          name: "Countries");

      migrationBuilder.DropTable(
          name: "Users");
    }
  }
}
