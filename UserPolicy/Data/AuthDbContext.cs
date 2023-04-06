namespace UserPolicy;

using Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AuthDbContext : IdentityDbContext<User>
{
	public AuthDbContext(DbContextOptions<AuthDbContext> options) : base( options )
	{ }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating( builder );
	}
}