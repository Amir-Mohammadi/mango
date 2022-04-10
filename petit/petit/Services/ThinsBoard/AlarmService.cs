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
  public interface IAlarmService : IScopedDependency
  {
    Task AckAlarm(string alarmId, CancellationToken cancellationToken = default);
    Task ClearAlarm(string alarmId, CancellationToken cancellationToken = default);
    Task<bool?> DeleteAlarm(string alarmId, CancellationToken cancellationToken = default);
    Task<Alarm> GetAlarmById(string alarmId, CancellationToken cancellationToken = default);
    Task<AlarmInfo> GetAlarmInfoById(string alarmId, CancellationToken cancellationToken = default);
    Task<PageData<AlarmInfo>> GetAlarms(string entityType,
                                        string entityId,
                                        string searchStatus,
                                        string status,
                                        int? pageSize = 10,
                                        int? page = 0,
                                        string textSearch = null,
                                        string sortProperty = null,
                                        string sortOrder = null,
                                        long? startTime = null,
                                        long? endTime = null,
                                        string offset = null,
                                        bool? fetchOriginator = null,
                                        CancellationToken cancellationToken = default);
    Task<string> GetHighestAlarmSeverity(string entityType, string entityId, string searchStatus, string status, CancellationToken cancellationToken = default);
    Task<Alarm> SaveAlarm(Alarm alarm, CancellationToken cancellationToken = default);
  }
  public class AlarmService : IAlarmService
  {
    public AlarmService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task AckAlarm(string alarmId, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/{alarmId}/ack";
      var routeParams = new Dictionary<string, string> { { "alarmId", alarmId } };
      await restClientService.PostAsync(path: path,
                                        routeParams: routeParams,
                                        cancellationToken: cancellationToken);
    }
    public async Task ClearAlarm(string alarmId, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/{alarmId}/clear";
      var routeParams = new Dictionary<string, string> { { "alarmId", alarmId } };
      await restClientService.PostAsync(path: path,
                                        routeParams: routeParams,
                                        cancellationToken: cancellationToken);
    }
    public async Task<bool?> DeleteAlarm(string alarmId, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/{alarmId}";
      var routeParams = new Dictionary<string, string> { { "alarmId", alarmId } };
      var result = await restClientService.DeleteAsync(path: path,
                                                       routeParams: routeParams,
                                                       cancellationToken: cancellationToken);
      return result.IsSuccessStatusCode;
    }
    public async Task<Alarm> GetAlarmById(string alarmId, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/{alarmId}";
      var routeParams = new Dictionary<string, string> { { "alarmId", alarmId } };
      var result = await restClientService.GetAsync<Alarm>(path: path,
                                                           routeParams: routeParams,
                                                           cancellationToken: cancellationToken);
      return result;
    }
    public async Task<AlarmInfo> GetAlarmInfoById(string alarmId, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/info/{alarmId}";
      var routeParams = new Dictionary<string, string> { { "alarmId", alarmId } };
      var result = await restClientService.GetAsync<AlarmInfo>(path: path,
                                                               routeParams: routeParams,
                                                               cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AlarmInfo>> GetAlarms(string entityType,
                                                     string entityId,
                                                     string searchStatus,
                                                     string status,
                                                     int? pageSize,
                                                     int? page,
                                                     string textSearch = null,
                                                     string sortProperty = null,
                                                     string sortOrder = null,
                                                     long? startTime = null,
                                                     long? endTime = null,
                                                     string offset = null,
                                                     bool? fetchOriginator = null,
                                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/{entityType}/{entityId}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (searchStatus != null)
        queryParams.Add("searchStatus", Convert.ToString(searchStatus));
      if (status != null)
        queryParams.Add("status", Convert.ToString(status));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      if (textSearch != null)
        queryParams.Add("textSearch", Convert.ToString(textSearch));
      if (sortProperty != null)
        queryParams.Add("sortProperty", Convert.ToString(sortProperty));
      if (sortOrder != null)
        queryParams.Add("sortOrder", Convert.ToString(sortOrder));
      if (startTime != null)
        queryParams.Add("startTime", Convert.ToString(startTime));
      if (endTime != null)
        queryParams.Add("endTime", Convert.ToString(endTime));
      if (offset != null)
        queryParams.Add("offset", Convert.ToString(offset));
      if (fetchOriginator != null)
        queryParams.Add("fetchOriginator", Convert.ToString(fetchOriginator));
      var result = await restClientService.GetAsync<PageData<AlarmInfo>>(path: path,
                                                                         routeParams: routeParams,
                                                                         queryParams: queryParams,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> GetHighestAlarmSeverity(string entityType,
                                                      string entityId,
                                                      string searchStatus,
                                                      string status,
                                                      CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm/highestSeverity/{entityType}/{entityId}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (searchStatus != null)
        queryParams.Add("searchStatus", Convert.ToString(searchStatus));
      if (status != null)
        queryParams.Add("status", Convert.ToString(status));
      var result = await restClientService.GetAsync<string>(path: path,
                                                            routeParams: routeParams,
                                                            queryParams: queryParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Alarm> SaveAlarm(Alarm alarm, CancellationToken cancellationToken = default)
    {
      var path = "/api/alarm";
      var body = restClientService.SerializeObject(alarm);
      var result = await restClientService.PostAsync<Alarm>(path: path, body: body, cancellationToken: cancellationToken);
      return result;
    }
  }
}