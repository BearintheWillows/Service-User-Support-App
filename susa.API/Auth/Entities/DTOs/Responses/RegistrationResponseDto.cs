namespace susa.API.Auth.Entities.DTOs.Responses;

public class RegistrationResponseDto
{
	public bool IsSuccessful { get; set; }
	public IEnumerable<string>? Errors { get; set; }
}