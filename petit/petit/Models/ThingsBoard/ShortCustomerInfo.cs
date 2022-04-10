namespace petit.Models.ThingsBoard
{
  public partial class ShortCustomerInfo
  {
    public CustomerId CustomerId { get; set; }
    public bool? Public { get; set; }
    public string Title { get; set; }
    public bool? IsPublic { get; set; }
  }
}