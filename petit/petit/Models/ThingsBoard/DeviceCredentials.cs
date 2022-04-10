namespace petit.Models.ThingsBoard
{
  public partial class DeviceCredentials
  {
    public DeviceCredentialsType? CredentialsType { get; set; }
    public long? CreatedTime { get; set; }
    public string CredentialsId { get; set; }
    public string CredentialsValue { get; set; }
    public DeviceId DeviceId { get; set; }
    public DeviceCredentialsId Id { get; set; }
  }
}