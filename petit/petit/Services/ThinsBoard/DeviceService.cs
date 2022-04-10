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
  public interface IDeviceService : IScopedDependency
  {
    Task<Device> AssignDeviceToCustomer(string customerId, string deviceId, CancellationToken cancellationToken = default);
    Task<Device> AssignDeviceToPublicCustomer(string deviceId, CancellationToken cancellationToken = default);
    Task<Device> AssignDeviceToTenant(string tenantId, string deviceId, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> ClaimDevice1(string deviceName, ClaimRequest claimRequest, CancellationToken cancellationToken = default);
    Task DeleteDevice(string deviceId, CancellationToken cancellationToken = default);
    Task<List<Device>> FindByQuery1(DeviceSearchQuery query, CancellationToken cancellationToken = default);
    Task<PageData<DeviceInfo>> GetCustomerDeviceInfos(string customerId,
                                                      int? pageSize = 10,
                                                      int? page = 0,
                                                      string type = null,
                                                      string deviceProfileId = null,
                                                      string textSearch = null,
                                                      string sortProperty = null,
                                                      string sortOrder = null,
                                                      CancellationToken cancellationToken = default);
    Task<PageData<Device>> GetCustomerDevices(string customerId,
                                              int pageSize = 10,
                                              int page = 0,
                                              string type = null,
                                              string textSearch = null,
                                              string sortProperty = null,
                                              string sortOrder = null,
                                              CancellationToken cancellationToken = default);
    Task<Device> GetDeviceById(string deviceId, CancellationToken cancellationToken = default);
    Task<DeviceCredentials> GetDeviceCredentialsByDeviceId(string deviceId, CancellationToken cancellationToken = default);
    Task<DeviceInfo> GetDeviceInfoById(string deviceId, CancellationToken cancellationToken = default);
    Task<List<EntitySubtype>> GetDeviceTypes(CancellationToken cancellationToken = default);
    Task<List<Device>> GetDevicesByIds(string deviceIds, CancellationToken cancellationToken = default);
    Task<PageData<DeviceInfo>> GetTenantDeviceInfos(int? pageSize = 10,
                                                    int? page = 0,
                                                    string type = null,
                                                    string deviceProfileId = null,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    CancellationToken cancellationToken = default);
    Task<Device> GetTenantDevice(string deviceName, CancellationToken cancellationToken = default);
    Task<PageData<Device>> GetTenantDevices(int? pageSize = 10,
                                            int? page = 10,
                                            string type = null,
                                            string textSearch = null,
                                            string sortProperty = null,
                                            string sortOrder = null,
                                            CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> ReClaimDevice(string deviceName, CancellationToken cancellationToken = default);
    Task<DeviceCredentials> SaveDeviceCredentials(DeviceCredentials deviceCredentials, CancellationToken cancellationToken = default);
    Task<Device> SaveDevice(Device device, string accessToken, CancellationToken cancellationToken = default);
    Task<Device> UnassignDeviceFromCustomer(string deviceId, CancellationToken cancellationToken = default);
    // api 
    Task<DeferredResultResponseEntity> ClaimDevice(string deviceToken, string json, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetDeviceAttributes(string deviceToken, string clientKeys, string sharedKeys, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> PostDeviceAttributes(string deviceToken, string json, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> PostRpcRequest(string deviceToken, string json, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> PostTelemetry(string deviceToken, string json, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> ProvisionDevice(string json, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> ReplyToCommand(string deviceToken, int? requestId, string json, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SubscribeToAttributes(string deviceToken, long? timeout, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SubscribeToCommands(string deviceToken, long? timeout, CancellationToken cancellationToken = default);
  }
  public class DeviceService : IDeviceService
  {
    public DeviceService(IRestClientService restClientService, IPetitErrorFactory petitErrorFactory)
    {
      this.restClientService = restClientService;
      this.petitErrorFactory = petitErrorFactory;
    }
    private readonly IRestClientService restClientService;
    private readonly IPetitErrorFactory petitErrorFactory;
    public async Task<Device> AssignDeviceToCustomer(string customerId,
                                                     string deviceId,
                                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/device/{deviceId}";
      var routeParams = new Dictionary<string, string>
    {
      { "customerId", customerId },
      { "deviceId", deviceId }
    };
      var result = await restClientService.PostAsync<Device>(path: path,
                                                             routeParams: routeParams,
                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Device> AssignDeviceToPublicCustomer(string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/public/device/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var result = await restClientService.PostAsync<Device>(path: path,
                                                             routeParams: routeParams,
                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Device> AssignDeviceToTenant(string tenantId, string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/{tenantId}/device/{deviceId}";
      var routeParams = new Dictionary<string, string>
      {
        { "tenantId", tenantId },
        { "deviceId", deviceId }
      };
      var result = await restClientService.PostAsync<Device>(path: path,
                                                             routeParams: routeParams,
                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> ClaimDevice1(string deviceName, ClaimRequest claimRequest, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/device/{deviceName}/claim";
      var routeParams = new Dictionary<string, string> { { "deviceName", deviceName } };
      var body = restClientService.SerializeObject(claimRequest);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task DeleteDevice(string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/device/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<List<Device>> FindByQuery1(DeviceSearchQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/devices";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<List<Device>>(path: path,
                                                                   body: body,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<DeviceInfo>> GetCustomerDeviceInfos(string customerId,
                                                                   int? pageSize = 10,
                                                                   int? page = 0,
                                                                   string type = null,
                                                                   string deviceProfileId = null,
                                                                   string textSearch = null,
                                                                   string sortProperty = null,
                                                                   string sortOrder = null,
                                                                   CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/deviceInfos";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var queryParams = new Dictionary<string, string>();
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
      if (deviceProfileId != null)
        queryParams.Add("deviceProfileId", Convert.ToString(deviceProfileId));
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
      var result = await restClientService.GetAsync<PageData<DeviceInfo>>(path: path,
                                                                          routeParams: routeParams,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Device>> GetCustomerDevices(string customerId,
                                                           int pageSize = 10,
                                                           int page = 0,
                                                           string type = null,
                                                           string textSearch = null,
                                                           string sortProperty = null,
                                                           string sortOrder = null,
                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/devices";
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
      var result = await restClientService.GetAsync<PageData<Device>>(path: path,
                                                                      routeParams: routeParams,
                                                                      queryParams: queryParams,
                                                                      cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Device> GetDeviceById(string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/device/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var result = await restClientService.GetAsync<Device>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      if (result == null) throw petitErrorFactory.ResourceNotFound(id: deviceId, name: "device", message: "device not found");
      return result;
    }
    public async Task<DeviceCredentials> GetDeviceCredentialsByDeviceId(string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/device/{deviceId}/credentials";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var result = await restClientService.GetAsync<DeviceCredentials>(path: path,
                                                                       routeParams: routeParams,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceInfo> GetDeviceInfoById(string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/device/info/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var result = await restClientService.GetAsync<DeviceInfo>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntitySubtype>> GetDeviceTypes(CancellationToken cancellationToken = default)
    {
      var path = "/api/device/types";
      var result = await restClientService.GetAsync<List<EntitySubtype>>(path: path,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<Device>> GetDevicesByIds(string deviceIds, CancellationToken cancellationToken = default)
    {
      var path = "/api/devices";
      var queryParams = new Dictionary<string, string>();
      if (deviceIds != null)
        queryParams.Add("deviceIds", Convert.ToString(deviceIds));
      var result = await restClientService.GetAsync<List<Device>>(path: path,
                                                                  queryParams: queryParams,
                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<DeviceInfo>> GetTenantDeviceInfos(int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string type = null,
                                                                 string deviceProfileId = null,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/deviceInfos";
      var queryParams = new Dictionary<string, string>();
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
      if (deviceProfileId != null)
        queryParams.Add("deviceProfileId", Convert.ToString(deviceProfileId));
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
      var result = await restClientService.GetAsync<PageData<DeviceInfo>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Device> GetTenantDevice(string deviceName, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/devices";
      var queryParams = new Dictionary<string, string>();
      if (deviceName != null)
        queryParams.Add("deviceName", Convert.ToString(deviceName));
      var result = await restClientService.GetAsync<Device>(path: path,
                                                            queryParams: queryParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Device>> GetTenantDevices(int? pageSize = 10,
                                                         int? page = 0,
                                                         string type = null,
                                                         string textSearch = null,
                                                         string sortProperty = null,
                                                         string sortOrder = null,
                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/devices";
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
      var result = await restClientService.GetAsync<PageData<Device>>(path: path,
                                                                      queryParams: queryParams,
                                                                      cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> ReClaimDevice(string deviceName, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/device/{deviceName}/claim";
      var routeParams = new Dictionary<string, string> { { "deviceName", deviceName } };
      var result = await restClientService.DeleteAsync<DeferredResultResponseEntity>(path: path,
                                                                                     routeParams: routeParams,
                                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceCredentials> SaveDeviceCredentials(DeviceCredentials deviceCredentials, CancellationToken cancellationToken = default)
    {
      var path = "/api/device/credentials";
      var body = restClientService.SerializeObject(deviceCredentials);
      var result = await restClientService.PostAsync<DeviceCredentials>(path: path,
                                                                        body: body,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Device> SaveDevice(Device device,
                                         string accessToken,
                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/device";
      var queryParams = new Dictionary<string, string>();
      if (accessToken != null)
        queryParams.Add("accessToken", Convert.ToString(accessToken));
      var body = restClientService.SerializeObject(device);
      var result = await restClientService.PostAsync<Device>(path: path,
                                                             body: body,
                                                             queryParams: queryParams,
                                                             cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Device> UnassignDeviceFromCustomer(string deviceId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/device/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var result = await restClientService.DeleteAsync<Device>(path: path, routeParams: routeParams, cancellationToken: cancellationToken);
      return result;
    }
    // api 
    public async Task<DeferredResultResponseEntity> ClaimDevice(string deviceToken, string json, CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/claim";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var body = restClientService.SerializeObject(json);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetDeviceAttributes(string deviceToken,
                                                                        string clientKeys,
                                                                        string sharedKeys,
                                                                        CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/attributes";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var queryParams = new Dictionary<string, string>();
      if (clientKeys != null)
        queryParams.Add("clientKeys", Convert.ToString(clientKeys));
      if (sharedKeys != null)
        queryParams.Add("sharedKeys", Convert.ToString(sharedKeys));
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> PostDeviceAttributes(string deviceToken,
                                                                         string json,
                                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/attributes";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var body = restClientService.SerializeObject(json);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> PostRpcRequest(string deviceToken, string json, CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/rpc";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var body = restClientService.SerializeObject(json);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> PostTelemetry(string deviceToken, string json, CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/telemetry";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var body = restClientService.SerializeObject(json);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> ProvisionDevice(string json, CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/provision";
      var body = restClientService.SerializeObject(json);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> ReplyToCommand(string deviceToken, int? requestId, string json, CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/rpc/{requestId}";
      var routeParams = new Dictionary<string, string>
      {
        { "deviceToken", deviceToken },
        { "requestId", Convert.ToString(requestId) }
      };
      var body = restClientService.SerializeObject(json);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SubscribeToAttributes(string deviceToken, long? timeout, CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/attributes/updates";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var queryParams = new Dictionary<string, string>();
      if (timeout != null)
        queryParams.Add("timeout", Convert.ToString(timeout));
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SubscribeToCommands(string deviceToken,
                                                                        long? timeout,
                                                                        CancellationToken cancellationToken = default)
    {
      var path = "/api/v1/{deviceToken}/rpc";
      var routeParams = new Dictionary<string, string> { { "deviceToken", deviceToken } };
      var queryParams = new Dictionary<string, string>();
      if (timeout != null)
        queryParams.Add("timeout", Convert.ToString(timeout));
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
  }
}