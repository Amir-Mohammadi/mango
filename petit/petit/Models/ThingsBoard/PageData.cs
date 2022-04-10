using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class PageData<T>
  {
    public List<T> Data { get; set; }
    public bool HasNext { get; set; }
    public long TotalElements { get; set; }
    public int TotalPages { get; set; }
  }
}