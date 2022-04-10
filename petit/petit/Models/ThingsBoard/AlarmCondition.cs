using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class AlarmCondition
  {
    public List<AlarmConditionFilter> Condition { get; set; }
    public AlarmConditionSpec Spec { get; set; }
  }
}