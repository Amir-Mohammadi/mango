namespace petit.Models.ThingsBoard
{
  public partial class WidgetType
  {
    public string Alias { get; set; }
    public string BundleAlias { get; set; }
    public long? CreatedTime { get; set; }
    public string Descriptor { get; set; }
    public WidgetTypeId Id { get; set; }
    public string Name { get; set; }
    public TenantId TenantId { get; set; }
  }
}