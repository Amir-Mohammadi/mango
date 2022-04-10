using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Models;

namespace petit.Models.ThingsBoard
{
  public class CustomersNotifications : IEntity
  {
    public int Id { get; set; }
    public DateTime? ReadDate { get; set; }
    public int CustomerId { get; set; }
    public int NotificationId { get; set; }
    public virtual Notification Notification { get; set; }
    public byte[] RowVersion { get; set; }
  }
}