using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class AssetSearchQuery
  {
    public List<string> AssetTypes { get; set; }
    public RelationsSearchParameters Parameters { get; set; }
    public string RelationType { get; set; }
  }
}