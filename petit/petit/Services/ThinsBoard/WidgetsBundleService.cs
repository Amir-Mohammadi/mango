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
  public interface IWidgetsBundleService : IScopedDependency
  {
    Task DeleteWidgetsBundle(string widgetsBundleId, CancellationToken cancellationToken = default);
    Task<WidgetsBundle> GetWidgetsBundleById(string widgetsBundleId, CancellationToken cancellationToken = default);
    Task<PageData<WidgetsBundle>> GetWidgetsBundles(int? pageSize = 10,
                                                    int? page = 0,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    CancellationToken cancellationToken = default);
    Task<List<WidgetsBundle>> GetWidgetsBundles1(CancellationToken cancellationToken = default);
    Task<WidgetsBundle> SaveWidgetsBundle(WidgetsBundle widgetsBundle, CancellationToken cancellationToken = default);
  }
  public class WidgetsBundleService : IWidgetsBundleService
  {
    public WidgetsBundleService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteWidgetsBundle(string widgetsBundleId, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetsBundle/{widgetsBundleId}";
      var routeParams = new Dictionary<string, string> { { "widgetsBundleId", widgetsBundleId } };
      await restClientService.DeleteAsync(
        path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<WidgetsBundle> GetWidgetsBundleById(string widgetsBundleId, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetsBundle/{widgetsBundleId}";
      var routeParams = new Dictionary<string, string> { { "widgetsBundleId", widgetsBundleId } };
      var result = await restClientService.GetAsync<WidgetsBundle>(path: path,
                                                                   routeParams: routeParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<WidgetsBundle>> GetWidgetsBundles(int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetsBundles";
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
      var result = await restClientService.GetAsync<PageData<WidgetsBundle>>(path: path,
                                                                             queryParams: queryParams,
                                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<WidgetsBundle>> GetWidgetsBundles1(CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetsBundles";
      var result = await restClientService.GetAsync<List<WidgetsBundle>>(path: path,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<WidgetsBundle> SaveWidgetsBundle(WidgetsBundle widgetsBundle, CancellationToken cancellationToken = default)
    {
      var path = "/api/widgetsBundle";
      var body = restClientService.SerializeObject(widgetsBundle);
      var result = await restClientService.PostAsync<WidgetsBundle>(path: path,
                                                                    body: body,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
  }
}