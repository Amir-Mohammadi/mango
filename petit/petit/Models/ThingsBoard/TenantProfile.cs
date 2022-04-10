namespace petit.Models.ThingsBoard
{
  public partial class TenantProfile
  {
    public long? CreatedTime { get; set; }
    public bool? Default { get; set; }
    public string Description { get; set; }
    public TenantProfileId Id { get; set; }
    public bool? IsolatedTbCore { get; set; }
    public bool? IsolatedTbRuleEngine { get; set; }
    public string Name { get; set; }
    public TenantProfileData ProfileData { get; set; }
  }
}