namespace UserPolicy.Entities.DTOs.Registration;

using System.ComponentModel.DataAnnotations;

public class UserForRegistrationDto
{
	public string? FirstName { get; set; }
	public string? LastName  { get; set; }

	[Required( ErrorMessage = "Email is required" )]
	[DataType( DataType.EmailAddress )]
	public string? Email { get; set; }

	public string? UserName => Email.Split( '@' )[ 0 ];

	[Required( ErrorMessage = "Password is required" )]
	[DataType( DataType.Password )]
	public string? Password { get; set; }

	[Compare( "Password", ErrorMessage = "Confirm Password is required" )]
	[DataType( DataType.Password )]
	public string? ConfirmPassword { get; set; }
}