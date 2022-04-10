namespace petit.Models.ThingsBoard
{
  public partial class OAuth2BasicMapperConfig
  {
    public TenantNameStrategy? TenantNameStrategy { get; set; }
    public bool? AlwaysFullScreen { get; set; }
    public string CustomerNamePattern { get; set; }
    public string DefaultDashboardName { get; set; }
    public string EmailAttributeKey { get; set; }
    public string FirstNameAttributeKey { get; set; }
    public string LastNameAttributeKey { get; set; }
    public string TenantNamePattern { get; set; }
  }
}