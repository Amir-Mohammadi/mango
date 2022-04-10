using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Models;

namespace petit.Models.ThingsBoard
{
  public class TermsOfService : IEntity
  {
    public int Id { get; set; }
    public string Body { get; set; }
    public bool IsAcceptedByMe { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public DateTime? DeletedDate { get; set; }
    public DateTime? CreatedDate { get; set; }
    public byte[] RowVersion { get; set; }
  }
}