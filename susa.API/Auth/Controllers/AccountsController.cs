namespace susa.API.Auth.Controllers;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserPolicy.Entities.Models;

[ApiController]
[Route( "api/[controller]" )]
public class AccountsController
{
	public readonly UserManager<User> _UserManager;
}