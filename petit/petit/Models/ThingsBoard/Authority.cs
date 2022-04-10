namespace petit.Models.ThingsBoard
{
  public static class Authority
  {
    public static string SysAdmin => "SYS_ADMIN";
    public static string TenantAdmin => "TENANT_ADMIN";
    public static string CustomerUser => "CUSTOMER_USER";
    public static string RefreshToken => "REFRESH_TOKEN";
  }
}