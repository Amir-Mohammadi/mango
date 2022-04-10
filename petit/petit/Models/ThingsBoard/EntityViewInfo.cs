using System.Collections.Generic;

namespace petit.Models.ThingsBoard
{
  public partial class EntityViewInfo
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public long? CreatedTime { get; set; }
    public CustomerId CustomerId { get; set; }
    public bool? CustomerIsPublic { get; set; }
    public string CustomerTitle { get; set; }
    public long? EndTimeMs { get; set; }
    public EntityId EntityId { get; set; }
    public EntityViewId Id { get; set; }
    public TelemetryEntityView Keys { get; set; }
    public string Name { get; set; }
    public long? StartTimeMs { get; set; }
    public TenantId TenantId { get; set; }
    public string Type { get; set; }
  }
}