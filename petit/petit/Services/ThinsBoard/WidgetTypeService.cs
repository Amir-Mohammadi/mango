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
  public interface IWidgetTypeService : IScopedDependency
  {
    Task DeleteWidgetType(string widgetTypeId, CancellationToken cancellationToken = default);
    Task<List<WidgetTypeDetails>> GetBundleWidgetTypesDetails(string isSystem, string bundleAlias, CancellationToken cancellationToken = default);
    Task<List<WidgetTypeInfo>> GetBundleWidgetTypesInfos(string isSystem, string bundleAlias, CancellationToken cancellationToken = default);
    Task<List<WidgetType>> GetBundleWidgetTypes(string isSystem, string bundleAlias, CancellationToken cancellationToken = default);
    Task<WidgetTypeDetails> GetWidgetTypeById(string widgetTypeId, CancellationToken cancellationToken = default);
    Task<WidgetType> GetWidgetType(string isSystem, string bundleAlias, string alias, CancellationToken cancellationToken = default);
    Task<WidgetTypeDetails> SaveWidgetType(WidgetTypeDetails widgetTypeDetails, CancellationToken cancellationToken = default);
  }
  public class WidgetTypeService : IWidgetTypeService
  {
    public WidgetTypeService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteWidgetType(string widgetTypeId, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetType/{widgetTypeId}";
      var routeParams = new Dictionary<string, string> { { "widgetTypeId", widgetTypeId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<List<WidgetTypeDetails>> GetBundleWidgetTypesDetails(string isSystem, string bundleAlias, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetTypesDetails";
      var queryParams = new Dictionary<string, string>();
      if (isSystem != null)
        queryParams.Add("isSystem", Convert.ToString(isSystem));
      if (bundleAlias != null)
        queryParams.Add("bundleAlias", Convert.ToString(bundleAlias));
      var result = await restClientService.GetAsync<List<WidgetTypeDetails>>(path: path,
                                                                             queryParams: queryParams,
                                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<WidgetTypeInfo>> GetBundleWidgetTypesInfos(string isSystem, string bundleAlias, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetTypesInfos";
      var queryParams = new Dictionary<string, string>();
      if (isSystem != null)
        queryParams.Add("isSystem", Convert.ToString(isSystem));
      if (bundleAlias != null)
        queryParams.Add("bundleAlias", Convert.ToString(bundleAlias));
      var result = await restClientService.GetAsync<List<WidgetTypeInfo>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<WidgetType>> GetBundleWidgetTypes(string isSystem, string bundleAlias, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetTypes";
      var queryParams = new Dictionary<string, string>();
      if (isSystem != null)
        queryParams.Add("isSystem", Convert.ToString(isSystem));
      if (bundleAlias != null)
        queryParams.Add("bundleAlias", Convert.ToString(bundleAlias));
      var result = await restClientService.GetAsync<List<WidgetType>>(path: path,
                                                                      queryParams: queryParams,
                                                                      cancellationToken: cancellationToken);
      return result;
    }
    public async Task<WidgetTypeDetails> GetWidgetTypeById(string widgetTypeId, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetType/{widgetTypeId}";
      var routeParams = new Dictionary<string, string> { { "widgetTypeId", widgetTypeId } };
      var result = await restClientService.GetAsync<WidgetTypeDetails>(path: path,
                                                                       routeParams: routeParams,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task<WidgetType> GetWidgetType(string isSystem, string bundleAlias, string alias, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetType";
      var queryParams = new Dictionary<string, string>();
      if (isSystem != null)
        queryParams.Add("isSystem", Convert.ToString(isSystem));
      if (bundleAlias != null)
        queryParams.Add("bundleAlias", Convert.ToString(bundleAlias));
      if (alias != null)
        queryParams.Add("alias", Convert.ToString(alias));
      var result = await restClientService.GetAsync<WidgetType>(path: path,
                                                                queryParams: queryParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<WidgetTypeDetails> SaveWidgetType(WidgetTypeDetails widgetTypeDetails, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetType";
      var body = restClientService.SerializeObject(widgetTypeDetails);
      var result = await restClientService.PostAsync<WidgetTypeDetails>(path: path,
                                                                        body: body,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
  }
}