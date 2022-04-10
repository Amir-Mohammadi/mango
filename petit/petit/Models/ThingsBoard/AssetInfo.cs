using System.Collections.Generic;

namespace petit.Models.ThingsBoard
{
  public partial class AssetInfo
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public long? CreatedTime { get; set; }
    public CustomerId CustomerId { get; set; }
    public bool? CustomerIsPublic { get; set; }
    public string CustomerTitle { get; set; }
    public AssetId Id { get; set; }
    public string Label { get; set; }
    public string Name { get; set; }
    public TenantId TenantId { get; set; }
    public string Type { get; set; }
  }
}