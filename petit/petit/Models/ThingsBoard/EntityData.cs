using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityData
  {
    public EntityId EntityId { get; set; }
    public Dictionary<string, Dictionary<string, TsValue>> Latest { get; set; }
    public Dictionary<string, List<TsValue>> Timeseries { get; set; }
  }
}