using System.Collections.Generic;
namespace petit.Models.Common
{
  public class SMSServiceSetting
  {
    public string SourceNumber { get; set; }
    public string LookUpUrl { get; set; }
    public string Url { get; set; }
    public string ApiKey { get; set; }
  }
}