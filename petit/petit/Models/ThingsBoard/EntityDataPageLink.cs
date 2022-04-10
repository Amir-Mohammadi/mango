namespace petit.Models.ThingsBoard
{
  public partial class EntityDataPageLink
  {
    public int? PageSize { get; set; } = 10;
    public int? Page { get; set; } = 0;
    public string TextSearch { get; set; }
    public EntityDataSortOrder SortOrder { get; set; }
    public bool? Dynamic { get; set; }
  }
}