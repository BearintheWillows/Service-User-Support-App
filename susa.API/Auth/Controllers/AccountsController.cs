namespace susa.API.Auth.Controllers;

using System.IdentityModel.Tokens.Jwt;
using JwtFeatures;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using UserPolicy.Entities.DTOs.Authentication;
using UserPolicy.Entities.DTOs.Registration;
using UserPolicy.Entities.Models;

[ApiController]
[Route( "api/[controller]" )]
public class AccountsController : Controller
{
	private readonly UserManager<User> _userManager;
	private readonly JwtHandler _jwtHandler;

	public AccountsController(UserManager<User> userManager, JwtHandler jwtHandler)
	{
		_userManager = userManager;
		_jwtHandler = jwtHandler;
	}

	[HttpPost( "register" )]
	public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto? userForRegistration)
	{
		if ( userForRegistration == null)
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

		await _userManager.AddToRoleAsync( user, userForRegistration.Role.ToLower() );

		return Ok( new RegistrationResponseDto { IsSuccessful = true });
	}
	
	[HttpPost( "login" )]
	public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto? userForAuthentication)
	{
		if ( userForAuthentication == null || !ModelState.IsValid )
		{
			return BadRequest( new AuthenticationResponseDto 
			{ IsAuthenticationSuccessful = false,
			  ErrorMessage = "Invalid client request" 
			} );
		}

		if ( userForAuthentication.Email != null )
		{
			var user = await _userManager.FindByEmailAsync( userForAuthentication.Email );
		
			if ( user == null || !await _userManager.CheckPasswordAsync( user, userForAuthentication.Password ) )
			{
				return BadRequest( new AuthenticationResponseDto {
					 IsAuthenticationSuccessful = false,
					 ErrorMessage = "Email or Password Invalid" });
			}

			var signingCredentials = _jwtHandler.GetSigningCredentials();
			var claims = _jwtHandler.GetClaims( user );
			var tokenOptions = _jwtHandler.GenerateTokenOptions( signingCredentials, await claims );
			var jwtToken = new JwtSecurityTokenHandler().WriteToken( tokenOptions );

			return Ok( new AuthenticationResponseDto { IsAuthenticationSuccessful = true, Token = jwtToken } );
		} else
		{
			return BadRequest( "Email Required" );
		}
	}
}