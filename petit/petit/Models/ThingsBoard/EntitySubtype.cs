namespace petit.Models.ThingsBoard
{
  public partial class EntitySubtype
  {
    public string EntityType { get; set; }
    public TenantId TenantId { get; set; }
    public string Type { get; set; }
  }
}