using petit.Models.ThingsBoard;
namespace petit.Models.Devices
{
  public class DeviceResult
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Label { get; set; }
    public string Type { get; set; }
    public string ManagerId { get; set; }
    public string AssetId { get; set; }
    public string AssetLabel { get; set; }
    public string Zone { get; set; }
    public DeviceData DeviceData { get; set; }
    public string DeviceProfileId { get; set; }
  }
}