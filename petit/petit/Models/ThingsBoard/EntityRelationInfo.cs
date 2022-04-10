using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityRelationInfo
  {
    public string TypeGroup { get; set; }
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public EntityId From { get; set; }
    public string FromName { get; set; }
    public EntityId To { get; set; }
    public string ToName { get; set; }
    public string Type { get; set; }
  }
}