using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IAdminService : IScopedDependency
  {
    Task<UpdateMessage> CheckUpdates(CancellationToken cancellationToken = default);
    Task<AdminSettings> GetAdminSettings(string key, CancellationToken cancellationToken = default);
    Task<SecuritySettings> GetSecuritySettings(CancellationToken cancellationToken = default);
    Task<AdminSettings> SaveAdminSettings(AdminSettings adminSettings, CancellationToken cancellationToken = default);
    Task<SecuritySettings> SaveSecuritySettings(SecuritySettings securitySettings, CancellationToken cancellationToken = default);
    Task SendTestMail(AdminSettings adminSettings, CancellationToken cancellationToken = default);
    Task SendTestSms(TestSmsRequest testSmsRequest, CancellationToken cancellationToken = default);
  }
  public class AdminService : IAdminService
  {
    public AdminService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<UpdateMessage> CheckUpdates(CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/updates";
      var result = await restClientService.GetAsync<UpdateMessage>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<AdminSettings> GetAdminSettings(string key, CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/settings/{key}";
      var routeParams = new Dictionary<string, string> { { "key", key } };
      var result = await restClientService.GetAsync<AdminSettings>(path: path,
                                                                   routeParams: routeParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<SecuritySettings> GetSecuritySettings(CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/securitySettings";
      var result = await restClientService.GetAsync<SecuritySettings>(path: path,
                                                                      cancellationToken: cancellationToken);
      return result;
    }
    public async Task<AdminSettings> SaveAdminSettings(AdminSettings adminSettings, CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/settings";
      var body = restClientService.SerializeObject(adminSettings);
      var result = await restClientService.PostAsync<AdminSettings>(path: path,
                                                                    body: body,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<SecuritySettings> SaveSecuritySettings(SecuritySettings securitySettings, CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/securitySettings";
      var body = restClientService.SerializeObject(securitySettings);
      var result = await restClientService.PostAsync<SecuritySettings>(path: path,
                                                                       body: body,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task SendTestMail(AdminSettings adminSettings, CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/settings/testMail";
      var body = restClientService.SerializeObject(adminSettings);
      await restClientService.PostAsync(path: path,
                                        body: body,
                                        cancellationToken: cancellationToken);
    }
    public async Task SendTestSms(TestSmsRequest testSmsRequest, CancellationToken cancellationToken = default)
    {
      var path = "/api/admin/settings/testSms";
      var body = restClientService.SerializeObject(testSmsRequest);
      await restClientService.PostAsync(path: path,
                                        body: body,
                                        cancellationToken: cancellationToken);
    }
  }
}