using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
using petit.Models.Devices;

namespace petit.Services.ThingsBoard
{
  public interface ITelemetryService : IScopedDependency
  {
    Task<DeferredResultResponseEntity> DeleteEntityAttributes(string deviceId, string scope, string keys, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> DeleteEntityAttributes1(string entityType, string entityId, string scope, string keys, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> DeleteEntityTimeseries(string entityType, string entityId, string keys, bool? deleteAllDataForKeys, long? startTs, long? endTs, bool? rewriteLatestIfDeleted, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetAttributeKeysByScope(string entityType, string entityId, string scope, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetAttributeKeys(string entityType, string entityId, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetAttributesByScope(string entityType, string entityId, string scope, string keys, CancellationToken cancellationToken = default);
    Task<DeviceAttribute[]> GetAttributes(string entityType, string entityId, string keys, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetLatestTimeseries(string entityType, string entityId, string keys, bool? useStrictDataTypes, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetTimeseriesKeys1(string entityType, string entityId, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> GetTimeseries(string entityType, string entityId, string keys, string startTs, string endTs, long? interval, int? limit, string agg, string orderBy, bool? useStrictDataTypes, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SaveDeviceAttributes(string deviceId, string scope, string request, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SaveEntityAttributesV1(string entityType, string entityId, string scope, string request, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SaveEntityAttributesV2(string entityType, string entityId, string scope, string request, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SaveEntityTelemetry(string entityType, string entityId, string scope, string requestBody, CancellationToken cancellationToken = default);
    Task<DeferredResultResponseEntity> SaveEntityTelemetryWithTTL(string entityType, string entityId, string scope, long? ttl, string requestBody, CancellationToken cancellationToken = default);
  }
  public class TelemetryService : ITelemetryService
  {
    public TelemetryService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<DeferredResultResponseEntity> DeleteEntityAttributes(string deviceId,
                                                                           string scope,
                                                                           string keys,
                                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{deviceId}/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "deviceId", deviceId },
        { "scope", scope }
      };
      var queryParams = new Dictionary<string, string>();
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      var result = await restClientService.DeleteAsync<DeferredResultResponseEntity>(path: path,
                                                                                     routeParams: routeParams,
                                                                                     queryParams: queryParams,
                                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> DeleteEntityAttributes1(string entityType,
                                                                            string entityId,
                                                                            string scope,
                                                                            string keys,
                                                                            CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope }
      };
      var queryParams = new Dictionary<string, string>();
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      var result = await restClientService.DeleteAsync<DeferredResultResponseEntity>(path: path,
                                                                                     routeParams: routeParams,
                                                                                     queryParams: queryParams,
                                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> DeleteEntityTimeseries(string entityType,
                                                                           string entityId,
                                                                           string keys,
                                                                           bool? deleteAllDataForKeys,
                                                                           long? startTs,
                                                                           long? endTs,
                                                                           bool? rewriteLatestIfDeleted,
                                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/timeseries/delete";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      if (deleteAllDataForKeys != null)
        queryParams.Add("deleteAllDataForKeys", Convert.ToString(deleteAllDataForKeys));
      if (startTs != null)
        queryParams.Add("startTs", Convert.ToString(startTs));
      if (endTs != null)
        queryParams.Add("endTs", Convert.ToString(endTs));
      if (rewriteLatestIfDeleted != null)
        queryParams.Add("rewriteLatestIfDeleted", Convert.ToString(rewriteLatestIfDeleted));
      var result = await restClientService.DeleteAsync<DeferredResultResponseEntity>(path: path,
                                                                                     routeParams: routeParams,
                                                                                     queryParams: queryParams,
                                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetAttributeKeysByScope(string entityType,
                                                                            string entityId,
                                                                            string scope,
                                                                            CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/keys/attributes/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope }
      };
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetAttributeKeys(string entityType,
                                                                     string entityId,
                                                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/keys/attributes";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetAttributesByScope(string entityType,
                                                                         string entityId,
                                                                         string scope,
                                                                         string keys,
                                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/values/attributes/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope }
      };
      var queryParams = new Dictionary<string, string>();
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeviceAttribute[]> GetAttributes(string entityType,
                                                                  string entityId,
                                                                  string keys,
                                                                  CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/values/attributes";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      var result = await restClientService.GetAsync<DeviceAttribute[]>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetLatestTimeseries(string entityType,
                                                                        string entityId,
                                                                        string keys,
                                                                        bool? useStrictDataTypes,
                                                                        CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/values/timeseries";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      if (useStrictDataTypes != null)
        queryParams.Add("useStrictDataTypes", Convert.ToString(useStrictDataTypes));
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetTimeseriesKeys1(string entityType,
                                                                       string entityId,
                                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/keys/timeseries";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> GetTimeseries(string entityType,
                                                                  string entityId,
                                                                  string keys,
                                                                  string startTs,
                                                                  string endTs,
                                                                  long? interval,
                                                                  int? limit,
                                                                  string agg,
                                                                  string orderBy,
                                                                  bool? useStrictDataTypes,
                                                                  CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/values/timeseries";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (interval != null)
        queryParams.Add("interval", Convert.ToString(interval));
      if (limit != null)
        queryParams.Add("limit", Convert.ToString(limit));
      if (agg != null)
        queryParams.Add("agg", Convert.ToString(agg));
      if (orderBy != null)
        queryParams.Add("orderBy", Convert.ToString(orderBy));
      if (useStrictDataTypes != null)
        queryParams.Add("useStrictDataTypes", Convert.ToString(useStrictDataTypes));
      if (keys != null)
        queryParams.Add("keys", Convert.ToString(keys));
      if (startTs != null)
        queryParams.Add("startTs", Convert.ToString(startTs));
      if (endTs != null)
        queryParams.Add("endTs", Convert.ToString(endTs));
      var result = await restClientService.GetAsync<DeferredResultResponseEntity>(path: path,
                                                                                  routeParams: routeParams,
                                                                                  queryParams: queryParams,
                                                                                  cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SaveDeviceAttributes(string deviceId,
                                                                         string scope,
                                                                         string request,
                                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{deviceId}/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "deviceId", deviceId },
        { "scope", scope }
      };
      var body = restClientService.SerializeObject(request);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SaveEntityAttributesV1(string entityType,
                                                                           string entityId,
                                                                           string scope,
                                                                           string request,
                                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope }
      };
      var body = restClientService.SerializeObject(request);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   routeParams: routeParams,
                                                                                   body: body,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SaveEntityAttributesV2(string entityType,
                                                                           string entityId,
                                                                           string scope,
                                                                           string request,
                                                                           CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/attributes/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope }
      };
      var body = restClientService.SerializeObject(request);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SaveEntityTelemetry(string entityType,
                                                                        string entityId,
                                                                        string scope,
                                                                        string requestBody,
                                                                        CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/timeseries/{scope}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope }
      };
      var body = restClientService.SerializeObject(requestBody);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<DeferredResultResponseEntity> SaveEntityTelemetryWithTTL(string entityType,
                                                                               string entityId,
                                                                               string scope,
                                                                               long? ttl,
                                                                               string requestBody,
                                                                               CancellationToken cancellationToken = default)
    {
      var path = "/api/plugins/telemetry/{entityType}/{entityId}/timeseries/{scope}/{ttl}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "scope", scope },
        { "ttl", Convert.ToString(ttl)}
      };
      var body = restClientService.SerializeObject(requestBody);
      var result = await restClientService.PostAsync<DeferredResultResponseEntity>(path: path,
                                                                                   body: body,
                                                                                   routeParams: routeParams,
                                                                                   cancellationToken: cancellationToken);
      return result;
    }
  }
}