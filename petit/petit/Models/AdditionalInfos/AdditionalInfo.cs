using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Models;

namespace petit.Models.AdditionalInfos
{
  public class AdditionalInfo : IEntity
  {
    public int Id { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
    public int EntityTypeId { get; set; }
    public int EntityId { get; set; }
    public virtual EntityType EntityType { get; set; }
    public virtual Entity Entity { get; set; }
    public byte[] RowVersion { get; set; }
  }
}