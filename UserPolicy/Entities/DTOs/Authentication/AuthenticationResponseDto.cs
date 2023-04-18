namespace UserPolicy.Entities.DTOs.Authentication;

using Account;

public class AuthenticationResponseDto
{
	public bool IsAuthenticationSuccessful { get; set; }
	public string? ErrorMessage { get; set; }
	public string? Token { get; set; }

	public UserDto? User { get; set; } = null;

	


}