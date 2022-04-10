using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;

namespace petit.Models.Notifications
{
  public class NotificationResult
  {
    public int Id { get; set; }
    public int Version { get; set; }
    public bool IsImportant { get; set; }
    public bool IsBroadcast { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public DateTime? ReadDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public DateTime? DeletedDate { get; set; }
    public DateTime? CreatedDate { get; set; }
  }
}