using petit.Models.ThingsBoard;
namespace petit.Models.Devices
{
  public class AddDeviceInput
  {
    public string DeviceIdentifier { get; set; }
    public string Label { get; set; }
    public string Type { get; set; }
    public string Zone { get; set; }
    public string DeviceProfileId { get; set; }
    public string AccessToken { get; set; }
  }
}