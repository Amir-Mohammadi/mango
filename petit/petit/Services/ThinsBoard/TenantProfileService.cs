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
  public interface ITenantProfileService : IScopedDependency
  {
    Task DeleteTenantProfile(string tenantProfileId, CancellationToken cancellationToken = default);
    Task<EntityInfo> GetDefaultTenantProfileInfo(CancellationToken cancellationToken = default);
    Task<TenantProfile> GetTenantProfileById(string tenantProfileId, CancellationToken cancellationToken = default);
    Task<EntityInfo> GetTenantProfileInfoById(string tenantProfileId, CancellationToken cancellationToken = default);
    Task<PageData<EntityInfo>> GetTenantProfileInfos(int? pageSize = 10,
                                                     int? page = 0,
                                                     string textSearch = null,
                                                     string sortProperty = null,
                                                     string sortOrder = null,
                                                     CancellationToken cancellationToken = default);
    Task<PageData<TenantProfile>> GetTenantProfiles(int? pageSize = 10,
                                                    int? page = 0,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    CancellationToken cancellationToken = default);
    Task<TenantProfile> SaveTenantProfile(TenantProfile tenantProfile, CancellationToken cancellationToken = default);
    Task<TenantProfile> SetDefaultTenantProfile(string tenantProfileId, CancellationToken cancellationToken = default);
  }
  public class TenantProfileService : ITenantProfileService
  {
    public TenantProfileService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteTenantProfile(string tenantProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfile/{tenantProfileId}";
      var routeParams = new Dictionary<string, string> { { "tenantProfileId", tenantProfileId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<EntityInfo> GetDefaultTenantProfileInfo(CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfileInfo/default";
      var result = await restClientService.GetAsync<EntityInfo>(path: path,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<TenantProfile> GetTenantProfileById(string tenantProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfile/{tenantProfileId}";
      var routeParams = new Dictionary<string, string> { { "tenantProfileId", tenantProfileId } };
      var result = await restClientService.GetAsync<TenantProfile>(path: path,
                                                                   routeParams: routeParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityInfo> GetTenantProfileInfoById(string tenantProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfileInfo/{tenantProfileId}";
      var routeParams = new Dictionary<string, string> { { "tenantProfileId", tenantProfileId } };
      var result = await restClientService.GetAsync<EntityInfo>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<EntityInfo>> GetTenantProfileInfos(int? pageSize = 10,
                                                                  int? page = 0,
                                                                  string textSearch = null,
                                                                  string sortProperty = null,
                                                                  string sortOrder = null,
                                                                  CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfileInfos";
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
      var result = await restClientService.GetAsync<PageData<EntityInfo>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<TenantProfile>> GetTenantProfiles(int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfiles";
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
      var result = await restClientService.GetAsync<PageData<TenantProfile>>(path: path,
                                                                             queryParams: queryParams,
                                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<TenantProfile> SaveTenantProfile(TenantProfile tenantProfile, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfile";
      var body = restClientService.SerializeObject(tenantProfile);
      var result = await restClientService.PostAsync<TenantProfile>(path: path,
                                                                    body: body,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<TenantProfile> SetDefaultTenantProfile(string tenantProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantProfile/{tenantProfileId}/default";
      var routeParams = new Dictionary<string, string> { { "tenantProfileId", tenantProfileId } };
      var result = await restClientService.PostAsync<TenantProfile>(path: path,
                                                                    routeParams: routeParams,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
  }
}