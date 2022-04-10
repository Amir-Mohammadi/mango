using System.Collections.Generic;
using System.Text;
namespace petit.Models.ThingsBoard
{
  public partial class RuleChain
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public string Configuration { get; set; }
    public long? CreatedTime { get; set; }
    public bool? DebugMode { get; set; }
    public RuleNodeId FirstRuleNodeId { get; set; }
    public RuleChainId Id { get; set; }
    public string Name { get; set; }
    public bool? Root { get; set; }
    public TenantId TenantId { get; set; }
  }
}