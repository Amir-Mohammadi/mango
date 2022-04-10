namespace petit.Models.ThingsBoard
{
  public partial class TestSmsRequest
  {
    public string Message { get; set; }
    public string NumberTo { get; set; }
    public SmsProviderConfiguration ProviderConfiguration { get; set; }
  }
}