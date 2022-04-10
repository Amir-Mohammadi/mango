using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace petit.Models.AdditionalInfos
{
  public class AdditionalInfoResult
  {
    public int Id { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
    public int EntityTypeId { get; set; }
    public int EntityId { get; set; }
  }
}