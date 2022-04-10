namespace petit.Models.ThingsBoard
{
  public partial class AdminSettings
  {
    public long? CreatedTime { get; set; }
    public AdminSettingsId Id { get; set; }
    public string JsonValue { get; set; }
    public string Key { get; set; }
  }
}