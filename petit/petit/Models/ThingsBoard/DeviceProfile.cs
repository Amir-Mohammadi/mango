namespace petit.Models.ThingsBoard
{
  public partial class DeviceProfile
  {
    public ProvisionType? ProvisionType { get; set; }
    public TransportType? TransportType { get; set; }
    public DeviceProfileType? Type { get; set; }
    public long? CreatedTime { get; set; }
    public bool? Default { get; set; }
    public string DefaultQueueName { get; set; }
    public RuleChainId DefaultRuleChainId { get; set; }
    public string Description { get; set; }
    public DeviceProfileId Id { get; set; }
    public string Name { get; set; }
    public DeviceProfileData ProfileData { get; set; }
    public string ProvisionDeviceKey { get; set; }
    public TenantId TenantId { get; set; }
  }
}