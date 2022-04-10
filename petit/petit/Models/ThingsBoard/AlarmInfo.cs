using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class AlarmInfo
  {
    public Severity? Severity { get; set; }
    public AlarmStatus? Status { get; set; }
    public long? AckTs { get; set; }
    public long? ClearTs { get; set; }
    public long? CreatedTime { get; set; }
    public string Details { get; set; }
    public long? EndTs { get; set; }
    public AlarmId Id { get; set; }
    public string Name { get; set; }
    public EntityId Originator { get; set; }
    public string OriginatorName { get; set; }
    public bool? Propagate { get; set; }
    public List<string> PropagateRelationTypes { get; set; }
    public long? StartTs { get; set; }
    public TenantId TenantId { get; set; }
    public string Type { get; set; }
  }
}