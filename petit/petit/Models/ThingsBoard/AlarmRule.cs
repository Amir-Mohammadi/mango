namespace petit.Models.ThingsBoard
{
  public partial class AlarmRule
  {
    public string AlarmDetails { get; set; }
    public AlarmCondition Condition { get; set; }
    public AlarmSchedule Schedule { get; set; }
  }
}