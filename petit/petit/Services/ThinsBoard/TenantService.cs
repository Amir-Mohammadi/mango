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
  public interface ITenantService : IScopedDependency
  {
    Task DeleteTenant(string tenantId, CancellationToken cancellationToken = default);
    Task<Tenant> GetTenantById(string tenantId, CancellationToken cancellationToken = default);
    Task<TenantInfo> GetTenantInfoById(string tenantId, CancellationToken cancellationToken = default);
    Task<PageData<TenantInfo>> GetTenantInfos(int? pageSize = 10,
                                              int? page = 0,
                                              string textSearch = null,
                                              string sortProperty = null,
                                              string sortOrder = null,
                                              CancellationToken cancellationToken = default);
    Task<PageData<Tenant>> GetTenants(int? pageSize = 10,
                                      int? page = 0,
                                      string textSearch = null,
                                      string sortProperty = null,
                                      string sortOrder = null,
                                      CancellationToken cancellationToken = default);
    Task<Tenant> SaveTenant(Tenant tenant, CancellationToken cancellationToken = default);
  }
  public class TenantService : ITenantService
  {
    public TenantService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteTenant(string tenantId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/{tenantId}";
      var routeParams = new Dictionary<string, string> { { "tenantId", tenantId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<Tenant> GetTenantById(string tenantId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/{tenantId}";
      var routeParams = new Dictionary<string, string> { { "tenantId", tenantId } };
      var result = await restClientService.GetAsync<Tenant>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<TenantInfo> GetTenantInfoById(string tenantId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/info/{tenantId}";
      var routeParams = new Dictionary<string, string> { { "tenantId", tenantId } };
      var result = await restClientService.GetAsync<TenantInfo>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<TenantInfo>> GetTenantInfos(int? pageSize = 10,
                                                           int? page = 0,
                                                           string textSearch = null,
                                                           string sortProperty = null,
                                                           string sortOrder = null,
                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/tenantInfos";
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
      var result = await restClientService.GetAsync<PageData<TenantInfo>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Tenant>> GetTenants(int? pageSize = 10,
                                                   int? page = 0,
                                                   string textSearch = null,
                                                   string sortProperty = null,
                                                   string sortOrder = null,
                                                   CancellationToken cancellationToken = default)
    {
      var path = "/api/tenants";
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
      var result = await restClientService.GetAsync<PageData<Tenant>>(path: path,
                                                                      queryParams: queryParams,
                                                                      cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Tenant> SaveTenant(Tenant tenant, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant";
      var body = restClientService.SerializeObject(tenant);
      var result = await restClientService.PostAsync<Tenant>(path: path,
                                                             body: body,
                                                             cancellationToken: cancellationToken);
      return result;
    }
  }
}