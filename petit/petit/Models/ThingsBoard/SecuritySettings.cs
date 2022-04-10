namespace petit.Models.ThingsBoard
{
  public partial class SecuritySettings
  {
    public int? MaxFailedLoginAttempts { get; set; }
    public UserPasswordPolicy PasswordPolicy { get; set; }
    public string UserLockoutNotificationEmail { get; set; }
  }
}