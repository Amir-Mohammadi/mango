using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityViewSearchQuery
  {
    public List<string> EntityViewTypes { get; set; }
    public RelationsSearchParameters Parameters { get; set; }
    public string RelationType { get; set; }
  }
}