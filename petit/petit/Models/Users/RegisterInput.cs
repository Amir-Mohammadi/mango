using System;

namespace petit.Models.Users
{
  public class RegisterInput
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public Guid? ProfileImageId { get; set; }
    public string RegisterToken { get; set; }
  }
}