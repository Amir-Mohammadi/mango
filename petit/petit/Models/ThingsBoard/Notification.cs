using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Models;

namespace petit.Models.ThingsBoard
{
  public class Notification : IEntity
  {
    public int Id { get; set; }
    public int Version { get; set; }
    public bool IsImportant { get; set; }
    public bool IsBroadcast { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public string TargetCustomerIds { get; set; }
    public NotificationType NotificationType { get; set; }
    public DateTime? ReadDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public DateTime? DeletedDate { get; set; }
    public DateTime? CreatedDate { get; set; }
    public byte[] RowVersion { get; set; }
  }
}