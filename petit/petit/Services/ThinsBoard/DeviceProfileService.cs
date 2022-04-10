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
  public interface IDeviceProfileService : IScopedDependency
  {
    Task DeleteDeviceProfile(string deviceProfileId, CancellationToken cancellationToken = default);
    Task<List<string>> GetAttributesKeys(string deviceProfileId, CancellationToken cancellationToken = default);
    Task<DeviceProfileInfo> GetDefaultDeviceProfileInfo(CancellationToken cancellationToken = default);
    Task<DeviceProfile> GetDeviceProfileById(string deviceProfileId, CancellationToken cancellationToken = default);
    Task<DeviceProfileInfo> GetDeviceProfileInfoById(string deviceProfileId, CancellationToken cancellationToken = default);
    Task<PageData<DeviceProfileInfo>> GetDeviceProfileInfos(int? pageSize = 10,
                                                            int? page = 0,
                                                            string textSearch = null,
                                                            string sortProperty = null,
                                                            string sortOrder = null,
                                                            string transportType = null,
                                                            CancellationToken cancellationToken = default);
    Task<PageData<DeviceProfile>> GetDeviceProfiles(int? pageSize = 10,
                                                    int? page = 0,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    CancellationToken cancellationToken = default);
    Task<List<string>> GetTimeseriesKeys(string deviceProfileId, CancellationToken cancellationToken = default);
    Task<DeviceProfile> SaveDeviceProfile(DeviceProfile deviceProfile, CancellationToken cancellationToken = default);
    Task<DeviceProfile> SetDefaultDeviceProfile(string deviceProfileId, CancellationToken cancellationToken = default);
  }
  public class DeviceProfileService : IDeviceProfileService
  {
    public DeviceProfileService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteDeviceProfile(string deviceProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfile/{deviceProfileId}";
      var routeParams = new Dictionary<string, string> { { "deviceProfileId", deviceProfileId } };
      await restClientService.DeleteAsync(path: path, routeParams: routeParams, cancellationToken: cancellationToken);
    }
    public async Task<List<string>> GetAttributesKeys(string deviceProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfile/devices/keys/attributes";
      var queryParams = new Dictionary<string, string>();
      if (deviceProfileId != null)
        queryParams.Add("deviceProfileId", Convert.ToString(deviceProfileId));
      var result = await restClientService.GetAsync<List<string>>(path: path,
                                                                  queryParams: queryParams,
                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceProfileInfo> GetDefaultDeviceProfileInfo(CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfileInfo/default";
      var result = await restClientService.GetAsync<DeviceProfileInfo>(path: path,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceProfile> GetDeviceProfileById(string deviceProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfile/{deviceProfileId}";
      var routeParams = new Dictionary<string, string> { { "deviceProfileId", deviceProfileId } };
      var result = await restClientService.GetAsync<DeviceProfile>(path: path,
                                                                   routeParams: routeParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceProfileInfo> GetDeviceProfileInfoById(string deviceProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfileInfo/{deviceProfileId}";
      var routeParams = new Dictionary<string, string> { { "deviceProfileId", deviceProfileId } };
      var result = await restClientService.GetAsync<DeviceProfileInfo>(path: path,
                                                                       routeParams: routeParams,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<DeviceProfileInfo>> GetDeviceProfileInfos(int? pageSize = 10,
                                                                         int? page = 0,
                                                                         string textSearch = null,
                                                                         string sortProperty = null,
                                                                         string sortOrder = null,
                                                                         string transportType = null,
                                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfileInfos";
      var queryParams = new Dictionary<string, string>();
      if (textSearch != null)
        queryParams.Add("textSearch", Convert.ToString(textSearch));
      if (sortProperty != null)
        queryParams.Add("sortProperty", Convert.ToString(sortProperty));
      if (sortOrder != null)
        queryParams.Add("sortOrder", Convert.ToString(sortOrder));
      if (transportType != null)
        queryParams.Add("transportType", Convert.ToString(transportType));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<DeviceProfileInfo>>(path: path,
                                                                                 queryParams: queryParams,
                                                                                 cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<DeviceProfile>> GetDeviceProfiles(int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfiles";
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
      var result = await restClientService.GetAsync<PageData<DeviceProfile>>(path: path,
                                                                             queryParams: queryParams,
                                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<string>> GetTimeseriesKeys(string deviceProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfile/devices/keys/timeseries";
      var queryParams = new Dictionary<string, string>();
      if (deviceProfileId != null)
        queryParams.Add("deviceProfileId", Convert.ToString(deviceProfileId));
      var result = await restClientService.GetAsync<List<string>>(path: path,
                                                                  queryParams: queryParams,
                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceProfile> SaveDeviceProfile(DeviceProfile deviceProfile, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfile";
      var body = restClientService.SerializeObject(deviceProfile);
      var result = await restClientService.PostAsync<DeviceProfile>(path: path,
                                                                    body: body,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceProfile> SetDefaultDeviceProfile(string deviceProfileId, CancellationToken cancellationToken = default)
    {
      var path = "/api/deviceProfile/{deviceProfileId}/default";
      var routeParams = new Dictionary<string, string> { { "deviceProfileId", deviceProfileId } };
      var result = await restClientService.PostAsync<DeviceProfile>(path: path, routeParams: routeParams, cancellationToken: cancellationToken);
      return result;
    }
  }
}