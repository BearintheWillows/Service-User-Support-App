namespace susa.API.Auth.Entities.Models;

using Microsoft.AspNetCore.Identity;

public class AppUser : IdentityUser
{
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
}