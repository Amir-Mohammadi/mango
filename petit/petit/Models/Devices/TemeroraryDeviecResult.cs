using petit.Models.ThingsBoard;

namespace petit.Models.Devices
{
    public class TemeroraryDeviecResult
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        public DeviceData DeviceData { get; set; }
        public string DeviceProfileId { get; set; }
    }
}
