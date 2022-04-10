namespace petit.Models.ThingsBoard
{
  public partial class WidgetsBundle
  {
    public string Alias { get; set; }
    public long? CreatedTime { get; set; }
    public string Description { get; set; }
    public WidgetsBundleId Id { get; set; }
    public string Image { get; set; }
    public TenantId TenantId { get; set; }
    public string Title { get; set; }
  }
}