using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class RelationEntityTypeFilter
  {
    public List<string> EntityTypes { get; set; }
    public string RelationType { get; set; }
  }
}