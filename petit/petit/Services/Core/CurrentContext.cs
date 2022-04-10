using System;
using System.Linq;
using System.Security.Claims;
using core.Autofac;
using core.Context;
using Microsoft.AspNetCore.Http;
namespace petit.Services.Core
{
  public interface ICurrentContext : IWorkContext, IScopedDependency
  {
  }
  public class CurrentContext : ICurrentContext
  {
    #region Fields
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly IPetitErrorFactory petitErrorFactory;
    #endregion
    #region Constractor
    public CurrentContext(IHttpContextAccessor httpContextAccessor,
                          IPetitErrorFactory petitErrorFactory)
    {
      this.httpContextAccessor = httpContextAccessor;
      this.petitErrorFactory = petitErrorFactory;
    }
    #endregion
    public string GetCurrentUserId()
    {
      var userIdClaim = GetCurrentUserIdClaim();
      if (userIdClaim == null)
      {
        throw petitErrorFactory.AccessDenied();
      }
      return userIdClaim.Value;
    }
    public string GetUserToken()
    {
      string token = httpContextAccessor.HttpContext.Request.Headers["Authorization"];
      return token[7..];
    }
    public DateTime GetUserTokenExpiration()
    {
      var exp = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "exp");
      DateTime dtDateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
      return dtDateTime.AddSeconds(double.Parse(exp.Value));
    }
    public bool IsAuthenticated()
    {
      return GetCurrentUserIdClaim()?.Value != null;
    }
    private Claim GetCurrentUserIdClaim()
    {
      return GetClaim("user-id");
    }
    public Claim GetClaim(string key)
    {
      return httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == key);
    }
  }
}