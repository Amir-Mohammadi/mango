using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Models;

namespace petit.Models.ThingsBoard
{
  public class VersionInfo : IEntity
  {
    public int Id { get; set; }
    public string VersionName { get; set; }
    public string VersionNumber { get; set; }
    public string DiscontinuedMessage { get; set; }
    public DateTime UpdatedTime { get; set; }
    public DateTime? DiscontinuedDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public byte[] RowVersion { get; set; }
  }
}