namespace petit.Models.ThingsBoard
{
  public enum NotificationType : byte
  {
    Alert = 0,
    Warning = 1,
    Accept = 2,
    Decline = 3,
    Error = 4,
    Update = 5,
    General_Notification = 6,
    Device_Critical_Error = 7,
    Force_Update = 8,
    Shared_Device_Remove_Alert = 9
  }
}