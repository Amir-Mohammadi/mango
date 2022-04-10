using System.Collections.Generic;
namespace petit.Models.ThingsBoard
{
  public partial class HomeDashboard
  {
    public List<ShortCustomerInfo> AssignedCustomers { get; set; }
    public string Configuration { get; set; }
    public long? CreatedTime { get; set; }
    public bool? HideDashboardToolbar { get; set; }
    public DashboardId Id { get; set; }
    public string Name { get; set; }
    public TenantId TenantId { get; set; }
    public string Title { get; set; }
  }
}