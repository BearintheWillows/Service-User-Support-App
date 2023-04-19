namespace susa.API.User.Controller;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UserPolicy.Entities.Models;

[ApiController]
[Route( "api/[controller]" )]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public UserController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var user = await _userManager.GetUserAsync(User);
        return Ok(user);
    }

}