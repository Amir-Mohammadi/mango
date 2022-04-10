using System;

namespace petit.Models.Users
{
  public class EditProfileInput
  {
    public string LastName { get; set; }
    public string FirstName { get; set; }
    public string Email { get; set; }
    public Guid? ProfileImageId { get; set; }
  }
}