using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Models;

namespace petit.Models.AdditionalInfos
{
  public class EntityType : IEntity
  {
    public int Id { get; set; }
    public string EntityName { get; set; }
    public byte[] RowVersion { get; set; }
  }
}