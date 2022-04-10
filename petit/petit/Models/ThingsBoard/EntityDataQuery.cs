using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityDataQuery
  {
    public List<EntityKey> EntityFields { get; set; }
    public EntityFilter EntityFilter { get; set; }
    public List<KeyFilter> KeyFilters { get; set; }
    public List<EntityKey> LatestValues { get; set; }
    public EntityDataPageLink PageLink { get; set; }
  }
}