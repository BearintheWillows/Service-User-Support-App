namespace susa.API.Auth.Controllers;

using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using UserPolicy.Entities.DTOs.Registration;
using UserPolicy.Entities.Models;

[ApiController]
[Route( "api/[controller]" )]
public class AccountsController : Controller
{
	private readonly UserManager<User> _userManager;

	public AccountsController(UserManager<User> userManager)
	{
		_userManager = userManager;
	}

	[HttpPost( "register" )]
	public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto? userForRegistration)
	{
		if ( userForRegistration == null || !ModelState.IsValid )
		{
			return BadRequest( "Invalid client request" );
		}

		User user = userForRegistration.Adapt<User>();
		
		var result = await _userManager.CreateAsync(user, userForRegistration.Password);

		if ( !result.Succeeded )
		{
			var errors = result.Errors.Select(e => e.Description);

			return BadRequest( new RegistrationResponseDto { IsSuccessful = false, Errors = errors } );
		}

		return Ok( new RegistrationResponseDto { IsSuccessful = true });
	}
}