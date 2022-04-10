using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class User
  {
    public string Authority { get; set; }
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public long? CreatedTime { get; set; }
    public CustomerId CustomerId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public UserId Id { get; set; }
    public string LastName { get; set; }
    public string Name { get; set; }
    public TenantId TenantId { get; set; }
    public string Phone { get; set; }
  }
}