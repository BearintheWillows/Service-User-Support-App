using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UserPolicy;
using UserPolicy.Entities.Models;

var builder = WebApplication.CreateBuilder( args );

builder.Services.AddDbContext<AuthDbContext>( options =>
	{
		options.UseSqlServer( builder.Configuration.GetConnectionString( "AuthDbConnection" ) );
	}
);


// Add Identity Services

builder.Services.AddIdentity<User, IdentityRole>()
       .AddEntityFrameworkStores<AuthDbContext>();

var app = builder.Build();


app.Run();