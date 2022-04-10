using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class TelemetryEntityView
  {
    public AttributesEntityView Attributes { get; set; }
    public List<string> Timeseries { get; set; }
  }
}