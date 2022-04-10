using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using core.Autofac;
using petit.Models.ThingsBoard;
using petit.Services.Core;
using petit.Services.RestClients;
namespace petit.Services.ThingsBoard
{
  public interface IAssetService : IScopedDependency
  {
    Task<Asset> AssignAssetToCustomer(string customerId, string assetId, CancellationToken cancellationToken = default);
    Task<Asset> AssignAssetToPublicCustomer(string assetId, CancellationToken cancellationToken = default);
    Task DeleteAsset(string assetId, CancellationToken cancellationToken = default);
    Task<List<Asset>> FindByQuery(AssetSearchQuery query, CancellationToken cancellationToken = default);
    Task<Asset> GetAssetById(string assetId, CancellationToken cancellationToken = default);
    Task<AssetInfo> GetAssetInfoById(string assetId, CancellationToken cancellationToken = default);
    Task<List<EntitySubtype>> GetAssetTypes(CancellationToken cancellationToken = default);
    Task<List<Asset>> GetAssetsByIds(string assetIds, CancellationToken cancellationToken = default);
    Task<PageData<AssetInfo>> GetCustomerAssetInfos(string customerId,
                                                    int? pageSize = 10,
                                                    int? page = 0,
                                                    string type = null,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    CancellationToken cancellationToken = default);
    Task<PageData<Asset>> GetCustomerAssets(string customerId,
                                            int? pageSize = 10,
                                            int? page = 0,
                                            string type = null,
                                            string textSearch = null,
                                            string sortProperty = null,
                                            string sortOrder = null,
                                            CancellationToken cancellationToken = default);
    Task<PageData<AssetInfo>> GetTenantAssetInfos(int? pageSize = 10,
                                                  int? page = 0,
                                                  string type = null,
                                                  string textSearch = null,
                                                  string sortProperty = null,
                                                  string sortOrder = null,
                                                  CancellationToken cancellationToken = default);
    Task<Asset> GetTenantAsset(string assetName, CancellationToken cancellationToken = default);
    Task<PageData<Asset>> GetTenantAssets(int? pageSize = 10,
                                          int? page = 0,
                                          string type = null,
                                          string textSearch = null,
                                          string sortProperty = null,
                                          string sortOrder = null,
                                          CancellationToken cancellationToken = default);
    Task<Asset> SaveAsset(Asset asset, CancellationToken cancellationToken = default);
    Task<Asset> UnassignAssetFromCustomer(string assetId, CancellationToken cancellationToken = default);
  }
  public class AssetService : IAssetService
  {
    public AssetService(IRestClientService restClientService, IPetitErrorFactory petitErrorFactory)
    {
      this.restClientService = restClientService;
      this.petitErrorFactory = petitErrorFactory;
    }
    private readonly IRestClientService restClientService;
    private readonly IPetitErrorFactory petitErrorFactory;
    public async Task<Asset> AssignAssetToCustomer(string customerId, string assetId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/asset/{assetId}";
      var routeParams = new Dictionary<string, string>
      {
        { "customerId", customerId },
        { "assetId", assetId }
      };
      var result = await restClientService.PostAsync<Asset>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Asset> AssignAssetToPublicCustomer(string assetId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/public/asset/{assetId}";
      var routeParams = new Dictionary<string, string> { { "assetId", assetId } };
      var result = await restClientService.PostAsync<Asset>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task DeleteAsset(string assetId, CancellationToken cancellationToken = default)
    {
      var path = "/api/asset/{assetId}";
      var routeParams = new Dictionary<string, string> { { "assetId", assetId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<List<Asset>> FindByQuery(AssetSearchQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/assets";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<List<Asset>>(path: path,
                                                                  body: body,
                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Asset> GetAssetById(string assetId, CancellationToken cancellationToken = default)
    {
      var path = "/api/asset/{assetId}";
      var routeParams = new Dictionary<string, string> { { "assetId", assetId } };
      var result = await restClientService.GetAsync<Asset>(path: path,
                                                           routeParams: routeParams,
                                                           cancellationToken: cancellationToken);

      if (result == null) throw petitErrorFactory.ResourceNotFound(id: assetId, name: "asset", message: "asset not found");

      return result;
    }
    public async Task<AssetInfo> GetAssetInfoById(string assetId, CancellationToken cancellationToken = default)
    {
      var path = "/api/asset/info/{assetId}";
      var routeParams = new Dictionary<string, string> { { "assetId", assetId } };
      var result = await restClientService.GetAsync<AssetInfo>(path: path,
                                                               routeParams: routeParams,
                                                               cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntitySubtype>> GetAssetTypes(CancellationToken cancellationToken = default)
    {
      var path = "/api/asset/types";
      var result = await restClientService.GetAsync<List<EntitySubtype>>(path: path,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<Asset>> GetAssetsByIds(string assetIds, CancellationToken cancellationToken = default)
    {
      var path = "/api/assets";
      var queryParams = new Dictionary<string, string>();
      if (assetIds != null)
        queryParams.Add("assetIds", Convert.ToString(assetIds));
      var result = await restClientService.GetAsync<List<Asset>>(path: path,
                                                                 queryParams: queryParams,
                                                                 cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AssetInfo>> GetCustomerAssetInfos(string customerId,
                                                                 int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string type = null,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/assetInfos";
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
      var result = await restClientService.GetAsync<PageData<AssetInfo>>(path: path,
                                                                         routeParams: routeParams,
                                                                         queryParams: queryParams,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Asset>> GetCustomerAssets(string customerId,
                                                         int? pageSize = 10,
                                                         int? page = 0,
                                                         string type = null,
                                                         string textSearch = null,
                                                         string sortProperty = null,
                                                         string sortOrder = null,
                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/assets";
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
      var result = await restClientService.GetAsync<PageData<Asset>>(path: path,
                                                                     queryParams: queryParams,
                                                                     routeParams: routeParams,
                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AssetInfo>> GetTenantAssetInfos(int? pageSize = 10,
                                                               int? page = 0,
                                                               string type = null,
                                                               string textSearch = null,
                                                               string sortProperty = null,
                                                               string sortOrder = null,
                                                               CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/assetInfos";
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
      var result = await restClientService.GetAsync<PageData<AssetInfo>>(path: path,
                                                                         queryParams: queryParams,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Asset> GetTenantAsset(string assetName, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/assets";
      var queryParams = new Dictionary<string, string>();
      if (assetName != null)
        queryParams.Add("assetName", Convert.ToString(assetName));
      var result = await restClientService.GetAsync<Asset>(path: path, queryParams: queryParams, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Asset>> GetTenantAssets(int? pageSize = 10,
                                                       int? page = 0,
                                                       string type = null,
                                                       string textSearch = null,
                                                       string sortProperty = null,
                                                       string sortOrder = null,
                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/assets";
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
      var result = await restClientService.GetAsync<PageData<Asset>>(path: path,
                                                                     queryParams: queryParams,
                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Asset> SaveAsset(Asset asset, CancellationToken cancellationToken = default)
    {
      var path = "/api/asset";
      var body = restClientService.SerializeObject(asset);
      var result = await restClientService.PostAsync<Asset>(path: path,
                                                            body: body,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Asset> UnassignAssetFromCustomer(string assetId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/asset/{assetId}";
      var routeParams = new Dictionary<string, string> { { "assetId", assetId } };
      var result = await restClientService.DeleteAsync<Asset>(path: path, routeParams: routeParams, cancellationToken: cancellationToken);
      return result;
    }
  }
}