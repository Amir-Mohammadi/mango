using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class RuleChainMetaData
  {
    public List<NodeConnectionInfo> Connections { get; set; }
    public int? FirstNodeIndex { get; set; }
    public List<RuleNode> Nodes { get; set; }
    public List<RuleChainConnectionInfo> RuleChainConnections { get; set; }
    public RuleChainId RuleChainId { get; set; }
  }
}