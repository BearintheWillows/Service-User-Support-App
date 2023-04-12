namespace susa.API.Data.Profiles.Config;

using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
{
	public void Configure(EntityTypeBuilder<UserProfile> builder)
	{
		builder.ToTable( "UserProfile" );
		builder.HasKey( x => x.Id );
		builder.Property( up => up.FirstName ).IsRequired().HasMaxLength( 50 );
		builder.Property( up => up.LastName ).IsRequired().HasMaxLength( 50 );
		builder.Property( up => up.Email ).IsRequired().HasMaxLength( 50 );
		builder.Property( up => up.DateOfBirth )
		       .IsRequired()
		       .HasColumnType( "date" )
		       .HasConversion( d => d.ToDateTime( new TimeOnly() ),
		                       d => new DateOnly( d.Year, d.Month, d.Day )
		        );
		builder.Property( up => up.Phone ).IsRequired().HasMaxLength( 50 );
		builder.Property( up => up.Role )
		       .IsRequired()
		       .HasConversion( r => r.ToString(),
		                       r => ( Role ) Enum.Parse( typeof(Role), r ));
		builder.Property( up => up.OwnerId ).IsRequired();
	}
}