using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IAuthService : IScopedDependency
  {
    Task<string> ActivateUser(string activateRequest, bool? sendActivationMail, CancellationToken cancellationToken = default);
    Task ChangePassword(string changePasswordRequest, CancellationToken cancellationToken = default);
    Task<string> CheckActivateToken(string activateToken, CancellationToken cancellationToken = default);
    Task<string> CheckResetToken(string resetToken, CancellationToken cancellationToken = default);
    Task<UserPasswordPolicy> GetUserPasswordPolicy(CancellationToken cancellationToken = default);
    Task<User> GetUser(CancellationToken cancellationToken = default);
    Task Logout(CancellationToken cancellationToken = default);
    Task RequestResetPasswordByEmail(string resetPasswordByEmailRequest, CancellationToken cancellationToken = default);
    Task<string> ResetPassword(string resetPasswordRequest, CancellationToken cancellationToken = default);
  }
  public class AuthService : IAuthService
  {
    public AuthService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<string> ActivateUser(string activateRequest,
                                           bool? sendActivationMail,
                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/activate";
      var queryParams = new Dictionary<string, string>();
      if (sendActivationMail != null)
        queryParams.Add("sendActivationMail", Convert.ToString(sendActivationMail));
      var body = restClientService.SerializeObject(activateRequest);
      var result = await restClientService.PostAsync<string>(path: path,
                                                             queryParams: queryParams,
                                                             body: body,
                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task ChangePassword(string changePasswordRequest, CancellationToken cancellationToken = default)
    {
      var path = "/api/auth/changePassword";
      var body = restClientService.SerializeObject(changePasswordRequest);
      await restClientService.PostAsync(path: path,
                                        body: body,
                                        cancellationToken: cancellationToken);
    }
    public async Task<string> CheckActivateToken(string activateToken, CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/activate";
      var queryParams = new Dictionary<string, string>();
      if (activateToken != null)
        queryParams.Add("activateToken", Convert.ToString(activateToken));
      var result = await restClientService.GetAsync<string>(path: path,
                                                            queryParams: queryParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> CheckResetToken(string resetToken, CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/resetPassword";
      var queryParams = new Dictionary<string, string>();
      if (resetToken != null)
        queryParams.Add("resetToken", Convert.ToString(resetToken));
      var result = await restClientService.GetAsync<string>(path: path,
                                                            queryParams: queryParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<UserPasswordPolicy> GetUserPasswordPolicy(CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/userPasswordPolicy";
      var result = await restClientService.GetAsync<UserPasswordPolicy>(path: path,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<User> GetUser(CancellationToken cancellationToken = default)
    {
      var path = "/api/auth/user";
      var result = await restClientService.GetAsync<User>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task Logout(CancellationToken cancellationToken = default)
    {
      var path = "/api/auth/logout";
      await restClientService.PostAsync(path: path, cancellationToken: cancellationToken);
    }
    public async Task RequestResetPasswordByEmail(string resetPasswordByEmailRequest, CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/resetPasswordByEmail";
      var body = restClientService.SerializeObject(resetPasswordByEmailRequest);
      await restClientService.PostAsync(path: path, body: body, cancellationToken: cancellationToken);
    }
    public async Task<string> ResetPassword(string resetPasswordRequest, CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/resetPassword";
      var body = restClientService.SerializeObject(resetPasswordRequest);
      var result = await restClientService.PostAsync<string>(path: path,
                                                             body: body,
                                                             cancellationToken: cancellationToken);
      return result;
    }
  }
}