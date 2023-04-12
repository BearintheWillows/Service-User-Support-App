namespace susa.API.Data;

using Microsoft.EntityFrameworkCore;
using Profiles.Config;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options) : base( options )
	{
		
	}
	
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating( modelBuilder );
		modelBuilder.ApplyConfiguration( new UserProfileConfiguration() );
	}
}
