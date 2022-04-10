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
  public interface IDashboardService : IScopedDependency
  {
    Task<Dashboard> AddDashboardCustomers(string dashboardId, List<string> strCustomerIds, CancellationToken cancellationToken = default);
    Task<Dashboard> AssignDashboardToCustomer(string customerId, string dashboardId, CancellationToken cancellationToken = default);
    Task<Dashboard> AssignDashboardToPublicCustomer(string dashboardId, CancellationToken cancellationToken = default);
    Task DeleteDashboard(string dashboardId, CancellationToken cancellationToken = default);
    Task<PageData<DashboardInfo>> GetCustomerDashboards(string customerId,
                                                        int? pageSize = 10,
                                                        int? page = 0,
                                                        string textSearch = null,
                                                        string sortProperty = null,
                                                        string sortOrder = null,
                                                        CancellationToken cancellationToken = default);
    Task<Dashboard> GetDashboardById(string dashboardId, CancellationToken cancellationToken = default);
    Task<DashboardInfo> GetDashboardInfoById(string dashboardId, CancellationToken cancellationToken = default);
    Task<HomeDashboard> GetHomeDashboard(CancellationToken cancellationToken = default);
    Task<long?> GetMaxDatapointsLimit(CancellationToken cancellationToken = default);
    Task<long?> GetServerTime(CancellationToken cancellationToken = default);
    Task<PageData<DashboardInfo>> GetTenantDashboards(int? pageSize = 10,
                                                      int? page = 0,
                                                      string textSearch = null,
                                                      string sortProperty = null,
                                                      string sortOrder = null,
                                                      CancellationToken cancellationToken = default);
    Task<PageData<DashboardInfo>> GetTenantDashboards1(string tenantId,
                                                       int? pageSize = 10,
                                                       int? page = 0,
                                                       string textSearch = null,
                                                       string sortProperty = null,
                                                       string sortOrder = null,
                                                       CancellationToken cancellationToken = default);
    Task<HomeDashboardInfo> GetTenantHomeDashboardInfo(CancellationToken cancellationToken = default);
    Task<Dashboard> RemoveDashboardCustomers(string dashboardId, List<string> strCustomerIds, CancellationToken cancellationToken = default);
    Task<Dashboard> SaveDashboard(Dashboard dashboard, CancellationToken cancellationToken = default);
    Task SetTenantHomeDashboardInfo(HomeDashboardInfo homeDashboardInfo, CancellationToken cancellationToken = default);
    Task<Dashboard> UnassignDashboardFromCustomer(string customerId, string dashboardId, CancellationToken cancellationToken = default);
    Task<Dashboard> UnassignDashboardFromPublicCustomer(string dashboardId, CancellationToken cancellationToken = default);
    Task<Dashboard> UpdateDashboardCustomers(string dashboardId, List<string> strCustomerIds, CancellationToken cancellationToken = default);
  }
  public class DashboardService : IDashboardService
  {
    public DashboardService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<Dashboard> AddDashboardCustomers(string dashboardId, List<string> strCustomerIds, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/{dashboardId}/customers/add";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var body = restClientService.SerializeObject(strCustomerIds);
      var result = await restClientService.PostAsync<Dashboard>(path: path,
                                                                body: body,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> AssignDashboardToCustomer(string customerId, string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/dashboard/{dashboardId}";
      var routeParams = new Dictionary<string, string>
      {
        { "customerId", customerId },
        { "dashboardId", dashboardId }
      };
      var result = await restClientService.PostAsync<Dashboard>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> AssignDashboardToPublicCustomer(string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/public/dashboard/{dashboardId}";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var result = await restClientService.PostAsync<Dashboard>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task DeleteDashboard(string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/{dashboardId}";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<PageData<DashboardInfo>> GetCustomerDashboards(string customerId,
                                                                     int? pageSize = 10,
                                                                     int? page = 0,
                                                                     string textSearch = null,
                                                                     string sortProperty = null,
                                                                     string sortOrder = null,
                                                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/dashboards";
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
      var result = await restClientService.GetAsync<PageData<DashboardInfo>>(path: path,
                                                                             routeParams: routeParams,
                                                                             queryParams: queryParams,
                                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> GetDashboardById(string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/{dashboardId}";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var result = await restClientService.GetAsync<Dashboard>(path: path, routeParams: routeParams, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DashboardInfo> GetDashboardInfoById(string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/info/{dashboardId}";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var result = await restClientService.GetAsync<DashboardInfo>(path: path,
                                                                   routeParams: routeParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<HomeDashboard> GetHomeDashboard(CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/home";
      var result = await restClientService.GetAsync<HomeDashboard>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<long?> GetMaxDatapointsLimit(CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/maxDatapointsLimit";
      var result = await restClientService.GetAsync<long?>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<long?> GetServerTime(CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/serverTime";
      var result = await restClientService.GetAsync<long?>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<DashboardInfo>> GetTenantDashboards(int? pageSize = 10,
                                                                   int? page = 0,
                                                                   string textSearch = null,
                                                                   string sortProperty = null,
                                                                   string sortOrder = null,
                                                                   CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/dashboards";
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
      var result = await restClientService.GetAsync<PageData<DashboardInfo>>(path: path,
                                                                   queryParams: queryParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<DashboardInfo>> GetTenantDashboards1(string tenantId,
                                                                    int? pageSize = 10,
                                                                    int? page = 10,
                                                                    string textSearch = null,
                                                                    string sortProperty = null,
                                                                    string sortOrder = null,
                                                                    CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/{tenantId}/dashboards";
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
      var result = await restClientService.GetAsync<PageData<DashboardInfo>>(path: path,
                                                      routeParams: routeParams,
                                                      queryParams: queryParams,
                                                      cancellationToken: cancellationToken);
      return result;
    }
    public async Task<HomeDashboardInfo> GetTenantHomeDashboardInfo(CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/dashboard/home/info";
      var result = await restClientService.GetAsync<HomeDashboardInfo>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> RemoveDashboardCustomers(string dashboardId, List<string> strCustomerIds, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/{dashboardId}/customers/remove";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var body = restClientService.SerializeObject(strCustomerIds);
      var result = await restClientService.PostAsync<Dashboard>(path: path,
                                                                body: body,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> SaveDashboard(Dashboard dashboard, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard";
      var body = restClientService.SerializeObject(dashboard);
      var result = await restClientService.PostAsync<Dashboard>(path: path, body: body, cancellationToken: cancellationToken);
      return result;
    }
    public async Task SetTenantHomeDashboardInfo(HomeDashboardInfo homeDashboardInfo, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/dashboard/home/info";
      var body = restClientService.SerializeObject(homeDashboardInfo);
      await restClientService.PostAsync(path: path, body: body, cancellationToken: cancellationToken);
    }
    public async Task<Dashboard> UnassignDashboardFromCustomer(string customerId, string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/dashboard/{dashboardId}";
      var routeParams = new Dictionary<string, string>
      {
        { "customerId", customerId },
        { "dashboardId", dashboardId }
      };
      var result = await restClientService.DeleteAsync<Dashboard>(path: path,
                                                                  routeParams: routeParams,
                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> UnassignDashboardFromPublicCustomer(string dashboardId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/public/dashboard/{dashboardId}";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var result = await restClientService.DeleteAsync<Dashboard>(path: path,
                                                                  routeParams: routeParams,
                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Dashboard> UpdateDashboardCustomers(string dashboardId, List<string> strCustomerIds, CancellationToken cancellationToken = default)
    {
      var path = "/api/dashboard/{dashboardId}/customers";
      var routeParams = new Dictionary<string, string> { { "dashboardId", dashboardId } };
      var body = restClientService.SerializeObject(strCustomerIds);
      var result = await restClientService.PostAsync<Dashboard>(path: path,
                                                                body: body,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
  }
}