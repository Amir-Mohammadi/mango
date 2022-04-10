using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class OAuth2ClientsDomainParams
  {
    public List<ClientRegistrationDto> ClientRegistrations { get; set; }
    public List<DomainInfo> DomainInfos { get; set; }
  }
}