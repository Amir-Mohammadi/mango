namespace petit.Models.ThingsBoard
{
  public partial class KeyFilter
  {
    public FilterValueType? ValueType { get; set; }
    public EntityKey Key { get; set; }
    public KeyFilterPredicate Predicate { get; set; }
  }
}