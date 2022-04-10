
using System;
namespace petit.Models.ThingsBoard
{
  public partial class DeferredResultResponseEntity
  {
    public Object Result { get; set; }
    public bool? SetOrExpired { get; set; }
  }
}