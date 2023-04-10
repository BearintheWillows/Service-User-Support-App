namespace UserPolicy.Entities.Configuration;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
	public void Configure( EntityTypeBuilder<IdentityRole> builder )
	{
		builder.HasData( new IdentityRole
		{
			Name = "Admin",
			NormalizedName = "ADMIN"
		}, new IdentityRole
		{
			Name = "Manager",
			NormalizedName = "MANAGER"
		}, new IdentityRole
				{
				Name = "Employee",
				NormalizedName = "EMPLOYEE",
				},
			new IdentityRole
				{
				Name = "Agency Worker",
				NormalizedName = "AGENCY WORKER"
				}
		);
	}
}