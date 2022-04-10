using System.Collections.Generic;

namespace petit.Models.ThingsBoard
{
  public partial class RuleNode
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public string Configuration { get; set; }
    public long? CreatedTime { get; set; }
    public bool? DebugMode { get; set; }
    public RuleNodeId Id { get; set; }
    public string Name { get; set; }
    public RuleChainId RuleChainId { get; set; }
    public string Type { get; set; }
  }
}