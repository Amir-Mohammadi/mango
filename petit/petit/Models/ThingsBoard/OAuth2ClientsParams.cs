using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class OAuth2ClientsParams
  {
    public List<OAuth2ClientsDomainParams> DomainsParams { get; set; }
    public bool? Enabled { get; set; }
  }
}