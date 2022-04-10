using System.Collections.Generic;
namespace petit.Models.Common
{
  public class ThingsBoardSetting
  {
    public string AdminUserName { get; set; }
    public string AdminPassword { get; set; }
    public string TenantId { get; set; }
    public string ServerAddress { get; set; }
    public int RefreshTokenDateTime { get; set; }
  }
}