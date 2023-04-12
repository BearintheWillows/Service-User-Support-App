namespace susa.API.Data.Profiles.Entities;

using System.ComponentModel.DataAnnotations;

public class UserProfile
{
	
	public int      Id          { get; set; }
	public string   FirstName   { get; set; } = string.Empty;
	public string   LastName    { get; set; } = string.Empty;
	public DateOnly DateOfBirth { get; set; } = new();
	public string   Email       { get; set; } = string.Empty;
	public string   Phone       { get; set; } = string.Empty;
	public Role     Role        { get; set; } = Role.Default;
	
	public string OwnerId { get; set; }
	
}

public enum Role
{
	Manager,
	TeamLeader,
	Senior,
	SupportWorker,
	AgencyWorker,
	Default
	
}