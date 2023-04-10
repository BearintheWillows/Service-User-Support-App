namespace susa.API.Auth.JwtFeatures;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using UserPolicy.Entities.Models;

public class JwtHandler
{
	private readonly IConfiguration _configuration;
	private readonly IConfigurationSection _jwtSettings;
	
	public JwtHandler(IConfiguration configuration)
	{
		_configuration = configuration;
		_jwtSettings = _configuration.GetSection( "JwtSettings" );
	}
	
	public SigningCredentials GetSigningCredentials()
	{
		var key = Encoding.UTF8.GetBytes( _jwtSettings.GetSection( "securityKey" ).Value );
		var secret = new SymmetricSecurityKey( key );
		
		return new SigningCredentials( secret, SecurityAlgorithms.HmacSha256 );
	}
	
	public List<Claim> GetClaims(User user)
	{
		var claims = new List<Claim>
		{
			new Claim( ClaimTypes.Name, user.UserName ),
			new Claim( ClaimTypes.Email, user.Email ),
			new Claim( ClaimTypes.NameIdentifier, user.Id )
		};
		
		return claims;
	}
	
	public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
	{
		var tokenOptions = new JwtSecurityToken(
			issuer: _jwtSettings.GetSection( "issuer" ).Value,
			audience: _jwtSettings.GetSection( "audience" ).Value,
			claims: claims,
			expires: DateTime.Now.AddMinutes( Convert.ToDouble(_jwtSettings["expireInMinutes"]) ),
			signingCredentials: signingCredentials
		);
		
		return tokenOptions;
	}
}