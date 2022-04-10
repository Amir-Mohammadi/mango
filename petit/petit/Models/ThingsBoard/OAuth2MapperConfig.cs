namespace petit.Models.ThingsBoard
{
  public partial class OAuth2MapperConfig
  {
    public OAuth2MapperType? Type { get; set; }
    public bool? ActivateUser { get; set; }
    public bool? AllowUserCreation { get; set; }
    public OAuth2BasicMapperConfig Basic { get; set; }
    public OAuth2CustomMapperConfig Custom { get; set; }
  }
}