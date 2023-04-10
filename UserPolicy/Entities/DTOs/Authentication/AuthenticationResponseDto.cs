namespace UserPolicy.Entities.DTOs.Authentication;

public class AuthenticationResponseDto
{
	public bool IsAuthenticationSuccessful { get; set; }
	public string? ErrorMessage { get; set; }
	public string? Token { get; set; }
}