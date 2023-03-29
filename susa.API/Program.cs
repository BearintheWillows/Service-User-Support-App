using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using susa.API.Auth.Data;
using susa.API.Auth.Entities.Models;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.

builder.Services.AddControllers();

// Add Database Context

builder.Services.AddDbContext<AuthDbContext>( options =>
{
	options.UseSqlServer( builder.Configuration.GetConnectionString( "AuthDbConnection" ) );
} );



// Add Identity Services

builder.Services.AddIdentity<AppUser, IdentityRole>()
       .AddEntityFrameworkStores<AuthDbContext>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();