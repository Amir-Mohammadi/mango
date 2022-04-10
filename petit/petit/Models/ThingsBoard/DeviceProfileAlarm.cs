using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class DeviceProfileAlarm
  {
    public string AlarmType { get; set; }
    public AlarmRule ClearRule { get; set; }
    public Dictionary<string, AlarmRule> CreateRules { get; set; }
    public string Id { get; set; }
    public bool? Propagate { get; set; }
    public List<string> PropagateRelationTypes { get; set; }
  }
}