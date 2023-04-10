using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace susa.API.Migrations
{
    /// <inheritdoc />
    public partial class AddRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1bdf9e2d-e9a1-41ab-a2ec-35e70f923568", null, "Employee", "EMPLOYEE" },
                    { "35c62c71-4759-423d-a357-673c384ee7b8", null, "Admin", "ADMIN" },
                    { "c8485a0d-3233-4ab3-ae28-b973342ea943", null, "Manager", "MANAGER" },
                    { "cd182110-e3e8-452a-a005-4dc89009d468", null, "Agency Worker", "AGENCY WORKER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1bdf9e2d-e9a1-41ab-a2ec-35e70f923568");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "35c62c71-4759-423d-a357-673c384ee7b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8485a0d-3233-4ab3-ae28-b973342ea943");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cd182110-e3e8-452a-a005-4dc89009d468");
        }
    }
}
