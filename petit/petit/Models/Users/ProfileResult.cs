using System;
using System.Net;

namespace petit.Models.Users
{
  public class ProfileResult
  {
    public string Id { get; set; }
    public Guid? ProfileImageId { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public byte[] ImageRowVersion { get; set; }
    public string MainGalleryImageUrl
    {
      get
      {
        if (ProfileImageId == null)
          return null;
        var url = $"/document.ashx?id={WebUtility.UrlEncode(ProfileImageId.ToString())}&rv={Convert.ToBase64String(ImageRowVersion)}";
        return url;
      }
    }
  }
}