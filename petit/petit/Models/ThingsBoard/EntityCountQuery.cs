using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityCountQuery
  {
    public EntityFilter EntityFilter { get; set; }
    public List<KeyFilter> KeyFilters { get; set; }
  }
}