namespace petit.Models.ThingsBoard
{
  public class Button
  {
    public ButtonType ButtonType { get; set; }
    public string Title { get; set; }
    public ButtonAction Action { get; set; }
  }
}