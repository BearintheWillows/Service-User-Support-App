using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using UserPolicy;
using UserPolicy.Entities.Models;

var builder = WebApplication.CreateBuilder( args );

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .WriteTo.File( "Logs/log-.txt", rollingInterval: RollingInterval.Day )
            .WriteTo.Console( restrictedToMinimumLevel: LogEventLevel.Information )
            .CreateLogger();

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