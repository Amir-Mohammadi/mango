using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
using petit.Models.Users;
namespace petit.Services.ThingsBoard
{
  public interface IRpcService : IScopedDependency
  {
    Task<DeferredResultResponseEntity> HandleOneWayDeviceRPCRequest(AuthenticationResult userToken, string deviceId, object requestBody, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> HandleTwoWayDeviceRPCRequest(AuthenticationResult userToken, string deviceId, object requestBody, CancellationToken cancellationToken = default);
  }
  public class RpcService : IRpcService
  {
    public RpcService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<DeferredResultResponseEntity> HandleOneWayDeviceRPCRequest(AuthenticationResult userToken, string deviceId, object requestBody, CancellationToken cancellationToken = default)
    {
      var path = "/api/rpc/oneway/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var body = restClientService.SerializeObject(requestBody);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   token: userToken,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> HandleTwoWayDeviceRPCRequest(AuthenticationResult userToken, string deviceId, object requestBody, CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/rpc/twoway/{deviceId}";
      var routeParams = new Dictionary<string, string> { { "deviceId", deviceId } };
      var body = restClientService.SerializeObject(requestBody);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   token: userToken,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
  }
}