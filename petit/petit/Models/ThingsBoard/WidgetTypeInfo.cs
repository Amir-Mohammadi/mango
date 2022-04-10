namespace petit.Models.ThingsBoard
{
  public partial class WidgetTypeInfo
  {
    public string Alias { get; set; }
    public string BundleAlias { get; set; }
    public long? CreatedTime { get; set; }
    public string Description { get; set; }
    public WidgetTypeId Id { get; set; }
    public string Image { get; set; }
    public string Name { get; set; }
    public TenantId TenantId { get; set; }
    public string WidgetType { get; set; }
  }
}