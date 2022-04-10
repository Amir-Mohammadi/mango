using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IQueueService : IScopedDependency
  {
    Task<List<string>> GetTenantQueuesByServiceType(string serviceType, CancellationToken cancellationToken = default);
  }
  public class QueueService : IQueueService
  {
    public QueueService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<List<string>> GetTenantQueuesByServiceType(string serviceType, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/queues";
      var queryParams = new Dictionary<string, string>();
      if (serviceType != null)
        queryParams.Add("serviceType", Convert.ToString(serviceType));
      var result = await restClientService.GetAsync<List<string>>(path: path, queryParams: queryParams, cancellationToken: cancellationToken);
      return result;
    }
  }
}