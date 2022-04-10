using System.Text.RegularExpressions;
namespace petit.Services
{
  public static class FormatService
  {
    public static bool PhoneRegEx(string phone)
    {
      var regex = new Regex(@"^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$");
      var result = regex.IsMatch(phone);
      return result;
    }
    public static bool EmailRegEx(string email)
    {
      var regex = new Regex(@"^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$");
      var result = regex.IsMatch(email);
      return result;
    }
    public static string PhoneInternationalization(string phone)
    {
      if(phone.StartsWith('+'))
        return phone;
      return string.Format("+98" + phone.Remove(0,1));;
    }
  }
}