using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IEventService : IScopedDependency
  {
    Task<PageData<Event>> GetEvents(string entityType,
                                    string entityId,
                                    string eventType,
                                    string tenantId,
                                    int? pageSize = 10,
                                    int? page = 0,
                                    string textSearch = null,
                                    string sortProperty = null,
                                    string sortOrder = null,
                                    long? startTime = null,
                                    long? endTime = null,
                                    CancellationToken cancellationToken = default);
    Task<PageData<Event>> GetEvents1(string entityType,
                                     string entityId,
                                     string tenantId,
                                     int? pageSize = 10,
                                     int? page = 0,
                                     string textSearch = null,
                                     string sortProperty = null,
                                     string sortOrder = null,
                                     long? startTime = null,
                                     long? endTime = null,
                                     CancellationToken cancellationToken = default);
  }
  public class EventService : IEventService
  {
    public EventService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<PageData<Event>> GetEvents(string entityType,
                                                 string entityId,
                                                 string eventType,
                                                 string tenantId,
                                                 int? pageSize = 10,
                                                 int? page = 0,
                                                 string textSearch = null,
                                                 string sortProperty = null,
                                                 string sortOrder = null,
                                                 long? startTime = null,
                                                 long? endTime = null,
                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/events/{entityType}/{entityId}/{eventType}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId },
        { "eventType", eventType }
      };
      var queryParams = new Dictionary<string, string>();
      if (tenantId != null)
        queryParams.Add("tenantId", Convert.ToString(tenantId));
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
      var result = await restClientService.GetAsync<PageData<Event>>(path: path,
                                                                     routeParams: routeParams,
                                                                     queryParams: queryParams,
                                                                     cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Event>> GetEvents1(string entityType,
                                                  string entityId,
                                                  string tenantId,
                                                  int? pageSize = 10,
                                                  int? page = 0,
                                                  string textSearch = null,
                                                  string sortProperty = null,
                                                  string sortOrder = null,
                                                  long? startTime = null,
                                                  long? endTime = null,
                                                  CancellationToken cancellationToken = default)
    {
      var path = "/api/events/{entityType}/{entityId}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
      if (tenantId != null)
        queryParams.Add("tenantId", Convert.ToString(tenantId));
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
      var result = await restClientService.GetAsync<PageData<Event>>(path: path,
                                                                     routeParams: routeParams,
                                                                     queryParams: queryParams,
                                                                     cancellationToken: cancellationToken);
      return result;
    }
  }
}