using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class DeviceSearchQuery
  {
    public List<string> DeviceTypes { get; set; }
    public RelationsSearchParameters Parameters { get; set; }
    public string RelationType { get; set; }
  }
}