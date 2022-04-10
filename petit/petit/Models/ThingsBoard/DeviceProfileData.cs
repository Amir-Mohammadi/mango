using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class DeviceProfileData
  {
    public List<DeviceProfileAlarm> Alarms { get; set; }
    public DeviceProfileConfiguration Configuration { get; set; }
    public DeviceProfileProvisionConfiguration ProvisionConfiguration { get; set; }
    public DeviceProfileTransportConfiguration TransportConfiguration { get; set; }
  }
}