namespace petit.Models.Users
{
  public class AuthenticationResult
  {
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public TokenType TokenType { get; set; }
  }
}