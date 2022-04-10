using System.Collections.Generic;

namespace petit.Models.ThingsBoard
{
  public partial class RuleChainConnectionInfo
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public int? FromIndex { get; set; }
    public RuleChainId TargetRuleChainId { get; set; }
    public string Type { get; set; }
  }
}