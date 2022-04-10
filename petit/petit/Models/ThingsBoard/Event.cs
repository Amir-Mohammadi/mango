namespace petit.Models.ThingsBoard
{
  public partial class Event
  {
    public string Body { get; set; }
    public long? CreatedTime { get; set; }
    public EntityId EntityId { get; set; }
    public EventId Id { get; set; }
    public TenantId TenantId { get; set; }
    public string Type { get; set; }
    public string Uid { get; set; }
  }
}