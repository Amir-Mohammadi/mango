
using System;
namespace petit.Models.ThingsBoard
{
  public partial class AlarmConditionFilter
  {
    public FilterValueType? ValueType { get; set; }
    public AlarmConditionFilterKey Key { get; set; }
    public KeyFilterPredicate Predicate { get; set; }
    public Object Value { get; set; }
  }
}