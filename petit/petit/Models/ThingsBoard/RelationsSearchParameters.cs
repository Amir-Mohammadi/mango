namespace petit.Models.ThingsBoard
{
  public partial class RelationsSearchParameters
  {
    public string RootType { get; set; }
    public string Direction { get; set; }
    public string RelationTypeGroup { get; set; }
    public EntityId EntityId { get; set; }
    public string RootId { get; set; }
    public int? MaxLevel { get; set; }
    public bool? FetchLastLevelOnly { get; set; }
  }
}