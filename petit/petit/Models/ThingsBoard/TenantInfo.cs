using System.Collections.Generic;

namespace petit.Models.ThingsBoard
{
  public partial class TenantInfo
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public string Address { get; set; }
    public string Address2 { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public long? CreatedTime { get; set; }
    public string Email { get; set; }
    public TenantId Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Region { get; set; }
    public string State { get; set; }
    public TenantProfileId TenantProfileId { get; set; }
    public string TenantProfileName { get; set; }
    public string Title { get; set; }
    public string Zip { get; set; }
  }
}