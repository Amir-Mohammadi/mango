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
  public interface IEntityQueryService : IScopedDependency
  {
    Task<long?> CountEntitiesByQuery(EntityCountQuery query, CancellationToken cancellationToken = default);
    Task<PageData<AlarmData>> FindAlarmDataByQuery(AlarmDataQuery query, CancellationToken cancellationToken = default);
    Task<PageData<EntityData>> FindEntityDataByQuery(EntityDataQuery query, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> FindEntityTimeseriesAndAttributesKeysByQuery(EntityDataQuery query, bool? timeseries, bool? attributes, CancellationToken cancellationToken = default);
  }
  public class EntityQueryService : IEntityQueryService
  {
    public EntityQueryService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<long?> CountEntitiesByQuery(EntityCountQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/entitiesQuery/count";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<long?>(path: path,
                                                            body: body,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AlarmData>> FindAlarmDataByQuery(AlarmDataQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarmsQuery/find";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<PageData<AlarmData>>(path: path,
                                                                          body: body,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<EntityData>> FindEntityDataByQuery(EntityDataQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/entitiesQuery/find";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<PageData<EntityData>>(path: path,
                                                                           body: body,
                                                                           cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> FindEntityTimeseriesAndAttributesKeysByQuery(EntityDataQuery query,
                                                                                                 bool? timeseries,
                                                                                                 bool? attributes,
                                                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/entitiesQuery/find/keys";
      var queryParams = new Dictionary<string, string>();
      if (timeseries != null)
        queryParams.Add("timeseries", Convert.ToString(timeseries));
      if (attributes != null)
        queryParams.Add("attributes", Convert.ToString(attributes));
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   queryParams: queryParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
  }
}