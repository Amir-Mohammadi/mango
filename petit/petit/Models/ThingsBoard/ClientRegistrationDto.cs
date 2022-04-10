using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class ClientRegistrationDto
  {
    public string AccessTokenUri { get; set; }
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public string AuthorizationUri { get; set; }
    public string ClientAuthenticationMethod { get; set; }
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string JwkSetUri { get; set; }
    public string LoginButtonIcon { get; set; }
    public string LoginButtonLabel { get; set; }
    public OAuth2MapperConfig MapperConfig { get; set; }
    public List<string> Scope { get; set; }
    public string UserInfoUri { get; set; }
    public string UserNameAttributeName { get; set; }
  }
}