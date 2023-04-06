namespace UserPolicy.Entities.DTOs.Registration;

using System.ComponentModel.DataAnnotations;

public class UserForRegistrationDto
{
	public string? FirstName { get; set; }
	public string? LastName  { get; set; }

	[Required( ErrorMessage = "Email is required" )]
	public string? Email { get; set; }

	[Required( ErrorMessage = "Password is required" )]
	[DataType( DataType.Password )]
	public string? Password { get; set; }

	[Compare( "Password", ErrorMessage = "Confirm Password is required" )]
	[DataType( DataType.Password )]
	public string? ConfirmPassword { get; set; }
}