using System.ComponentModel.DataAnnotations;
namespace petit.Models.Users
{
  public class AuthenticationInput
  {
    [Phone()]
    public string Phone { get; set; }
  }
}