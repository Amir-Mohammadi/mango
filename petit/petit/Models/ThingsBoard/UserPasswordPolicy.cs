namespace petit.Models.ThingsBoard
{
  public partial class UserPasswordPolicy
  {
    public int? MinimumDigits { get; set; }
    public int? MinimumLength { get; set; }
    public int? MinimumLowercaseLetters { get; set; }
    public int? MinimumSpecialCharacters { get; set; }
    public int? MinimumUppercaseLetters { get; set; }
    public int? PasswordExpirationPeriodDays { get; set; }
    public int? PasswordReuseFrequencyDays { get; set; }
  }
}