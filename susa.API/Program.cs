using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using susa.API.Auth.JwtFeatures;
using susa.API.Data;
using susa.API.Mapping;
using UserPolicy;
using UserPolicy.Entities.Models;

var builder = WebApplication.CreateBuilder( args );

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .WriteTo.File( "Logs/log-.txt", rollingInterval: RollingInterval.Day )
            .WriteTo.Console( restrictedToMinimumLevel: LogEventLevel.Information )
            .CreateLogger();

builder.Services.RegisterMapsterConfiguration();

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>( options =>
	                                             options.UseSqlServer(
		                                             builder.Configuration.GetConnectionString( "DataDbConnection" )
	                                             )
);

// Add Identity Services

builder.Services.AddDbContext<AuthDbContext>( options =>
	{
		options.UseSqlServer( builder.Configuration.GetConnectionString( "AuthDbConnection" ), 
		                     			b => b.MigrationsAssembly( "susa.API" )
			);
	}
);

builder.Services.AddIdentity<User, IdentityRole>()
       .AddEntityFrameworkStores<AuthDbContext>();

//Add JWT Authentication

var jwtSettings = builder.Configuration.GetSection( "JwtSettings" );
builder.Services.AddAuthentication( opt =>
	{
		opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	}
).AddJwtBearer( options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
			{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = jwtSettings.GetSection( "issuer" ).Value,
			ValidAudience = jwtSettings.GetSection( "audience" ).Value,
			IssuerSigningKey =
				new SymmetricSecurityKey( Encoding.UTF8.GetBytes( jwtSettings.GetSection( "securityKey" ).Value ) )
			};
	}
);

builder.Services.AddScoped<JwtHandler>();

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

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();