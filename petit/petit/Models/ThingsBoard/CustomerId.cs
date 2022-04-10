namespace petit.Models.ThingsBoard
{
  public partial class CustomerId : EntityId
  {
    public CustomerId() : base(ThingsBoard.EntityType.Customer) { }
  }
}