using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class EntityRelation
  {
    public string TypeGroup { get; set; }
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public EntityId From { get; set; }
    public EntityId To { get; set; }
    public string Type { get; set; }
  }
}