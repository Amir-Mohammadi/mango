using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class RuleChainData
  {
    public List<RuleChainMetaData> Metadata { get; set; }
    public List<RuleChain> RuleChains { get; set; }
  }
}