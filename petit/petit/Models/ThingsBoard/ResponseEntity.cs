
using System;
namespace petit.Models.ThingsBoard
{
  public partial class ResponseEntity
  {
    public ResponseStatusCode? StatusCode { get; set; }
    public Object Body { get; set; }
    public int? StatusCodeValue { get; set; }
  }
}