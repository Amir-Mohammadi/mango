using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityRelationsQuery
  {
    public List<RelationEntityTypeFilter> Filters { get; set; }
    public RelationsSearchParameters Parameters { get; set; }
  }
}