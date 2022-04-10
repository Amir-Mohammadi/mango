namespace petit.Models.ThingsBoard
{
  public partial class EntityId
  {
    public EntityId(string entityType = null)
    {
      this.EntityType = entityType;
    }
    public string Id { get; set; }
    public string EntityType { get; set; }
  }
}