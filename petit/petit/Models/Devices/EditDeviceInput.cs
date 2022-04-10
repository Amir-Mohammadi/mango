namespace petit.Models.Devices
{
  public class EditDeviceInput
  {
    public string DeviceIdentifier { get; set; }
    public string Label { get; set; }
    public string Type { get; set; }
    public string Zone { get; set; }
    public string DeviceProfileId { get; set; }
  }
}