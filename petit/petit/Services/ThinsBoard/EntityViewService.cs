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
  public interface IEntityViewService : IScopedDependency
  {
    Task<EntityView> AssignEntityViewToCustomer(string customerId, string entityViewId, CancellationToken cancellationToken = default);
    Task<EntityView> AssignEntityViewToPublicCustomer(string entityViewId, CancellationToken cancellationToken = default);
    Task DeleteEntityView(string entityViewId, CancellationToken cancellationToken = default);
    Task<List<EntityView>> FindByQuery3(EntityViewSearchQuery query, CancellationToken cancellationToken = default);
    Task<PageData<EntityViewInfo>> GetCustomerEntityViewInfos(string customerId,
                                                              int? pageSize = 10,
                                                              int? page = 0,
                                                              string type = null,
                                                              string textSearch = null,
                                                              string sortProperty = null,
                                                              string sortOrder = null,
                                                              CancellationToken cancellationToken = default);
    Task<PageData<EntityView>> GetCustomerEntityViews(string customerId,
                                                      int? pageSize = 10,
                                                      int? page = 0,
                                                      string type = null,
                                                      string textSearch = null,
                                                      string sortProperty = null,
                                                      string sortOrder = null,
                                                      CancellationToken cancellationToken = default);
    Task<EntityView> GetEntityViewById(string entityViewId, CancellationToken cancellationToken = default);
    Task<EntityViewInfo> GetEntityViewInfoById(string entityViewId, CancellationToken cancellationToken = default);
    Task<List<EntitySubtype>> GetEntityViewTypes(CancellationToken cancellationToken = default);
    Task<PageData<EntityViewInfo>> GetTenantEntityViewInfos(int? pageSize = 10,
                                                            int? page = 0,
                                                            string type = null,
                                                            string textSearch = null,
                                                            string sortProperty = null,
                                                            string sortOrder = null,
                                                            CancellationToken cancellationToken = default);
    Task<EntityView> GetTenantEntityView(string entityViewName, CancellationToken cancellationToken = default);
    Task<PageData<EntityView>> GetTenantEntityViews(int? pageSize = 10,
                                                    int? page = 0,
                                                    string type = null,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    CancellationToken cancellationToken = default);
    Task<EntityView> SaveEntityView(EntityView entityView, CancellationToken cancellationToken = default);
    Task<EntityView> UnassignEntityViewFromCustomer(string entityViewId, CancellationToken cancellationToken = default);
  }
  public class EntityViewService : IEntityViewService
  {
    public EntityViewService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<EntityView> AssignEntityViewToCustomer(string customerId,
                                                             string entityViewId,
                                                             CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/entityView/{entityViewId}";
      var routeParams = new Dictionary<string, string>
      {
        { "customerId", customerId },
        { "entityViewId", entityViewId }
      };
      var result = await restClientService.PostAsync<EntityView>(path: path,
                                                                 routeParams: routeParams,
                                                                 cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityView> AssignEntityViewToPublicCustomer(string entityViewId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/public/entityView/{entityViewId}";
      var routeParams = new Dictionary<string, string> { { "entityViewId", entityViewId } };
      var result = await restClientService.PostAsync<EntityView>(path: path,
                                                                 routeParams: routeParams,
                                                                 cancellationToken: cancellationToken);
      return result;
    }
    public async Task DeleteEntityView(string entityViewId, CancellationToken cancellationToken = default)
    {
      var path = "/api/entityView/{entityViewId}";
      var routeParams = new Dictionary<string, string> { { "entityViewId", entityViewId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<List<EntityView>> FindByQuery3(EntityViewSearchQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/entityViews";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<List<EntityView>>(path: path,
                                                                       body: body,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<EntityViewInfo>> GetCustomerEntityViewInfos(string customerId,
                                                                           int? pageSize = 10,
                                                                           int? page = 0,
                                                                           string type = null,
                                                                           string textSearch = null,
                                                                           string sortProperty = null,
                                                                           string sortOrder = null,
                                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/entityViewInfos";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var queryParams = new Dictionary<string, string>();
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
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
      var result = await restClientService.GetAsync<PageData<EntityViewInfo>>(path: path,
                                                                              routeParams: routeParams,
                                                                              queryParams: queryParams,
                                                                              cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<EntityView>> GetCustomerEntityViews(string customerId,
                                                                   int? pageSize = 10,
                                                                   int? page = 0,
                                                                   string type = null,
                                                                   string textSearch = null,
                                                                   string sortProperty = null,
                                                                   string sortOrder = null,
                                                                   CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/entityViews";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var queryParams = new Dictionary<string, string>();
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
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
      var result = await restClientService.GetAsync<PageData<EntityView>>(path: path,
                                                                          routeParams: routeParams,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityView> GetEntityViewById(string entityViewId, CancellationToken cancellationToken = default)
    {
      var path = "/api/entityView/{entityViewId}";
      var routeParams = new Dictionary<string, string> { { "entityViewId", entityViewId } };
      var result = await restClientService.GetAsync<EntityView>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityViewInfo> GetEntityViewInfoById(string entityViewId, CancellationToken cancellationToken = default)
    {
      var path = "/api/entityView/info/{entityViewId}";
      var routeParams = new Dictionary<string, string> { { "entityViewId", entityViewId } };
      var result = await restClientService.GetAsync<EntityViewInfo>(path: path,
                                                                    routeParams: routeParams,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntitySubtype>> GetEntityViewTypes(CancellationToken cancellationToken = default)
    {
      var path = "/api/entityView/types";
      var result = await restClientService.GetAsync<List<EntitySubtype>>(path: path,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<EntityViewInfo>> GetTenantEntityViewInfos(int? pageSize = 10,
                                                                         int? page = 0,
                                                                         string type = null,
                                                                         string textSearch = null,
                                                                         string sortProperty = null,
                                                                         string sortOrder = null,
                                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/entityViewInfos";
      var queryParams = new Dictionary<string, string>();
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
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
      var result = await restClientService.GetAsync<PageData<EntityViewInfo>>(path: path,
                                                                              queryParams: queryParams,
                                                                              cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityView> GetTenantEntityView(string entityViewName, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/entityViews";
      var queryParams = new Dictionary<string, string>();
      if (entityViewName != null)
        queryParams.Add("entityViewName", Convert.ToString(entityViewName));
      var result = await restClientService.GetAsync<EntityView>(path: path,
                                                                queryParams: queryParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<EntityView>> GetTenantEntityViews(int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string type = null,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/entityViews";
      var queryParams = new Dictionary<string, string>();
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
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
      var result = await restClientService.GetAsync<PageData<EntityView>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityView> SaveEntityView(EntityView entityView, CancellationToken cancellationToken = default)
    {
      var path = "/api/entityView";
      var body = restClientService.SerializeObject(entityView);
      var result = await restClientService.PostAsync<EntityView>(path: path,
                                                                 body: body,
                                                                 cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityView> UnassignEntityViewFromCustomer(string entityViewId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/entityView/{entityViewId}";
      var routeParams = new Dictionary<string, string> { { "entityViewId", entityViewId } };
      var result = await restClientService.DeleteAsync<EntityView>(path: path,
                                                                   routeParams: routeParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
  }
}