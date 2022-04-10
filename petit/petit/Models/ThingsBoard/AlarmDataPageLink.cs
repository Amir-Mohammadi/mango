using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
namespace petit.Models.ThingsBoard
{
  public partial class AlarmDataPageLink
  {
    public List<AlarmPageStatus> StatusList { get; set; }
    public List<Severity> SeverityList { get; set; }
    public bool? Dynamic { get; set; }
    public int? Page { get; set; } = 0;
    public int? PageSize { get; set; } = 10;
    public EntityDataSortOrder SortOrder { get; set; }
    public long? StartTs { get; set; }
    public string TextSearch { get; set; }
    public long? EndTs { get; set; }
    public long? TimeWindow { get; set; }
    public List<string> TypeList { get; set; }
    public bool? SearchPropagatedAlarms { get; set; }
  }
}