namespace petit.Models.ThingsBoard
{
  public partial class DeviceProfileInfo
  {
    public TransportType? TransportType { get; set; }
    public DeviceProfileType? Type { get; set; }
    public EntityId Id { get; set; }
    public string Name { get; set; }
  }
}