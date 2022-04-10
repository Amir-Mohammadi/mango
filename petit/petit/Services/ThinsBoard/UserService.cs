using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
using petit.Services.Core;
using System.Linq;
using petit.Models.Users;
namespace petit.Services.ThingsBoard
{
  public interface IUserService : IScopedDependency
  {
    Task DeleteUser(string userId, CancellationToken cancellationToken = default);
    Task<string> GetActivationLink(string userId, CancellationToken cancellationToken = default);
    Task<PageData<User>> GetCustomerUsers(string customerId,
                                          int? pageSize = 10,
                                          int? page = 0,
                                          string textSearch = null,
                                          string sortProperty = null,
                                          string sortOrder = null,
                                          CancellationToken cancellationToken = default);
    Task<PageData<User>> GetTenantAdmins(string tenantId,
                                         int? pageSize = 10,
                                         int? page = 0,
                                         string textSearch = null,
                                         string sortProperty = null,
                                         string sortOrder = null,
                                         CancellationToken cancellationToken = default);
    Task<User> GetUserById(string userId, CancellationToken cancellationToken = default);
    Task<AuthenticationResult> GetUserToken(string userId, CancellationToken cancellationToken = default);
    Task<PageData<User>> GetUsers(int? pageSize = 10,
                                  int? page = 0,
                                  string textSearch = null,
                                  string sortProperty = null,
                                  string sortOrder = null,
                                  CancellationToken cancellationToken = default);
    Task<bool?> IsUserTokenAccessEnabled(CancellationToken cancellationToken = default);
    Task<User> SaveUser(User user, bool? sendActivationMail, CancellationToken cancellationToken = default);
    Task SendActivationEmail(string email, CancellationToken cancellationToken = default);
    Task SetUserCredentialsEnabled(string userId, bool? userCredentialsEnabled, CancellationToken cancellationToken = default);
    Task<User> AddAssetUser(Asset asset, Customer customer = null, CancellationToken cancellationToken = default);
    Task<User> GetCustomerAssetUser(string assetId, string managerId, CancellationToken cancellationToken = default);
  }
  public class UserService : IUserService
  {
    public UserService(IRestClientService restClientService,
                       ICurrentContext currentContext)
    {
      this.restClientService = restClientService;
      this.currentContext = currentContext;
    }
    private readonly IRestClientService restClientService;
    private readonly ICurrentContext currentContext;
    public async Task DeleteUser(string userId, CancellationToken cancellationToken = default)
    {
      var path = "/api/user/{userId}";
      var routeParams = new Dictionary<string, string> { { "userId", userId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<string> GetActivationLink(string userId, CancellationToken cancellationToken = default)
    {
      var path = "/api/user/{userId}/activationLink";
      var routeParams = new Dictionary<string, string> { { "userId", userId } };
      var result = await restClientService.GetAsync<string>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<User>> GetCustomerUsers(string customerId,
                                                       int? pageSize = 10,
                                                       int? page = 0,
                                                       string textSearch = null,
                                                       string sortProperty = null,
                                                       string sortOrder = null,
                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/users";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var queryParams = new Dictionary<string, string>();
      if (textSearch != null)
        queryParams.Add("textSearch", Convert.ToString(textSearch));
      if (sortProperty != null)
        queryParams.Add("sortProperty", Convert.ToString(sortProperty));
      if (sortOrder != null)
        queryParams.Add("sortOrder", Convert.ToString(sortOrder));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<User>>(path: path,
                                                                    routeParams: routeParams,
                                                                    queryParams: queryParams,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<User>> GetTenantAdmins(string tenantId,
                                                      int? pageSize = 10,
                                                      int? page = 0,
                                                      string textSearch = null,
                                                      string sortProperty = null,
                                                      string sortOrder = null,
                                                      CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/{tenantId}/users";
      var routeParams = new Dictionary<string, string> { { "tenantId", tenantId } };
      var queryParams = new Dictionary<string, string>();
      if (textSearch != null)
        queryParams.Add("textSearch", Convert.ToString(textSearch));
      if (sortProperty != null)
        queryParams.Add("sortProperty", Convert.ToString(sortProperty));
      if (sortOrder != null)
        queryParams.Add("sortOrder", Convert.ToString(sortOrder));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<User>>(path: path,
                                                                    routeParams: routeParams,
                                                                    queryParams: queryParams,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<User> GetUserById(string userId, CancellationToken cancellationToken = default)
    {
      var path = "/api/user/{userId}";
      var routeParams = new Dictionary<string, string> { { "userId", userId } };
      var result = await restClientService.GetAsync<User>(path: path,
                                                          routeParams: routeParams,
                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<AuthenticationResult> GetUserToken(string userId, CancellationToken cancellationToken = default)
    {
      var path = "/api/user/{userId}/token";
      var routeParams = new Dictionary<string, string> { { "userId", userId } };
      var result = await restClientService.GetAsync<AuthenticationResult>(path: path,
                                                                          routeParams: routeParams,
                                                                          cancellationToken: cancellationToken);
      result.TokenType = TokenType.DeviceUserToken;
      return result;
    }
    public async Task<PageData<User>> GetUsers(int? pageSize = 10,
                                               int? page = 0,
                                               string textSearch = null,
                                               string sortProperty = null,
                                               string sortOrder = null,
                                               CancellationToken cancellationToken = default)
    {
      var path = "/api/users";
      var queryParams = new Dictionary<string, string>();
      if (textSearch != null)
        queryParams.Add("textSearch", Convert.ToString(textSearch));
      if (sortProperty != null)
        queryParams.Add("sortProperty", Convert.ToString(sortProperty));
      if (sortOrder != null)
        queryParams.Add("sortOrder", Convert.ToString(sortOrder));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<User>>(path: path,
                                                                    queryParams: queryParams,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<bool?> IsUserTokenAccessEnabled(CancellationToken cancellationToken = default)
    {
      var path = "/api/user/tokenAccessEnabled";
      var result = await restClientService.GetAsync<bool?>(path: path,
                                                           cancellationToken: cancellationToken);
      return result;
    }
    public async Task<User> SaveUser(User user, bool? sendActivationMail, CancellationToken cancellationToken = default)
    {
      var path = "/api/user";
      var queryParams = new Dictionary<string, string>();
      if (sendActivationMail != null)
        queryParams.Add("sendActivationMail", Convert.ToString(sendActivationMail));
      var body = restClientService.SerializeObject(user);
      var result = await restClientService.PostAsync<User>(path: path,
                                                           queryParams: queryParams,
                                                           body: body,
                                                           cancellationToken: cancellationToken);
      return result;
    }
    public async Task SendActivationEmail(string email, CancellationToken cancellationToken = default)
    {
      var path = "/api/user/sendActivationMail";
      var queryParams = new Dictionary<string, string>();
      if (email != null)
        queryParams.Add("email", Convert.ToString(email));
      await restClientService.PostAsync(path: path,
                                        queryParams: queryParams,
                                        cancellationToken: cancellationToken);
    }
    public async Task SetUserCredentialsEnabled(string userId, bool? userCredentialsEnabled, CancellationToken cancellationToken = default)
    {
      var path = "/api/user/{userId}/userCredentialsEnabled";
      var routeParams = new Dictionary<string, string> { { "userId", userId } };
      var queryParams = new Dictionary<string, string>();
      if (userCredentialsEnabled != null)
        queryParams.Add("userCredentialsEnabled", Convert.ToString(userCredentialsEnabled));
      await restClientService.PostAsync(path: path,
                                        routeParams: routeParams,
                                        queryParams: queryParams,
                                        cancellationToken: cancellationToken);
    }
    public async Task<User> AddAssetUser(Asset asset, Customer customer = null, CancellationToken cancellationToken = default)
    {
      var customerId = customer == null ? currentContext.GetCurrentUserId() : customer.Id.Id;
      var assetUser = new User()
      {
        Email = $"A.{asset.Id.Id}-C.{customerId}-User@parlar.ir",
        CustomerId = asset.CustomerId,
        Authority = Authority.CustomerUser
      };
      assetUser = await SaveUser(user: assetUser,
                                 sendActivationMail: false,
                                 cancellationToken: cancellationToken);
      return assetUser;
    }
    public async Task<User> GetCustomerAssetUser(string assetId, string managerId, CancellationToken cancellationToken = default)
    {
      var customerId = currentContext.GetCurrentUserId();
      var users = await GetCustomerUsers(customerId: managerId,
                                         page: 0,
                                         pageSize: 1500,
                                         cancellationToken: cancellationToken);
      var Email = $"A.{assetId}-C.{customerId}-User@parlar.ir";
      var user = users.Data.FirstOrDefault(x => x.Email == Email);
      return user;
    }
  }
}