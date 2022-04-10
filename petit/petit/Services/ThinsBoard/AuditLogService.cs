using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IAuditLogService : IScopedDependency
  {
    Task<PageData<AuditLog>> GetAuditLogsByCustomerId(string customerId,
                                                      int? pageSize = 10,
                                                      int? page = 0,
                                                      string textSearch = null,
                                                      string sortProperty = null,
                                                      string sortOrder = null,
                                                      long? startTime = null,
                                                      long? endTime = null,
                                                      string actionTypes = null,
                                                      CancellationToken cancellationToken = default);
    Task<PageData<AuditLog>> GetAuditLogsByEntityId(string entityType,
                                                    string entityId,
                                                    int? pageSize = 10,
                                                    int? page = 0,
                                                    string textSearch = null,
                                                    string sortProperty = null,
                                                    string sortOrder = null,
                                                    long? startTime = null,
                                                    long? endTime = null,
                                                    string actionTypes = null,
                                                    CancellationToken cancellationToken = default);
    Task<PageData<AuditLog>> GetAuditLogsByUserId(string userId,
                                                  int? pageSize = 10,
                                                  int? page = 0,
                                                  string textSearch = null,
                                                  string sortProperty = null,
                                                  string sortOrder = null,
                                                  long? startTime = null,
                                                  long? endTime = null,
                                                  string actionTypes = null,
                                                  CancellationToken cancellationToken = default);
    Task<PageData<AuditLog>> GetAuditLogs(int? pageSize = 10,
                                          int? page = 0,
                                          string textSearch = null,
                                          string sortProperty = null,
                                          string sortOrder = null,
                                          long? startTime = null,
                                          long? endTime = null,
                                          string actionTypes = null,
                                          CancellationToken cancellationToken = default);
  }
  public class AuditLogService : IAuditLogService
  {
    public AuditLogService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<PageData<AuditLog>> GetAuditLogsByCustomerId(string customerId,
                                                                   int? pageSize = 10,
                                                                   int? page = 0,
                                                                   string textSearch = null,
                                                                   string sortProperty = null,
                                                                   string sortOrder = null,
                                                                   long? startTime = null,
                                                                   long? endTime = null,
                                                                   string actionTypes = null,
                                                                   CancellationToken cancellationToken = default)
    {
      var path = "/api/audit/logs/customer/{customerId}";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var queryParams = new Dictionary<string, string>();
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
      if (actionTypes != null)
        queryParams.Add("actionTypes", Convert.ToString(actionTypes));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<AuditLog>>(path: path,
                                                                        routeParams: routeParams,
                                                                        queryParams: queryParams,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AuditLog>> GetAuditLogsByEntityId(string entityType,
                                                                 string entityId,
                                                                 int? pageSize = 10,
                                                                 int? page = 0,
                                                                 string textSearch = null,
                                                                 string sortProperty = null,
                                                                 string sortOrder = null,
                                                                 long? startTime = null,
                                                                 long? endTime = null,
                                                                 string actionTypes = null,
                                                                 CancellationToken cancellationToken = default)
    {
      var path = "/api/audit/logs/entity/{entityType}/{entityId}";
      var routeParams = new Dictionary<string, string>
      {
        { "entityType", entityType },
        { "entityId", entityId }
      };
      var queryParams = new Dictionary<string, string>();
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
      if (actionTypes != null)
        queryParams.Add("actionTypes", Convert.ToString(actionTypes));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<AuditLog>>(path: path,
                                                                        routeParams: routeParams,
                                                                        queryParams: queryParams,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AuditLog>> GetAuditLogsByUserId(string userId,
                                                               int? pageSize = 10,
                                                               int? page = 0,
                                                               string textSearch = null,
                                                               string sortProperty = null,
                                                               string sortOrder = null,
                                                               long? startTime = null,
                                                               long? endTime = null,
                                                               string actionTypes = null,
                                                               CancellationToken cancellationToken = default)
    {
      var path = "/api/audit/logs/user/{userId}";
      var routeParams = new Dictionary<string, string> { { "userId", userId } };
      var queryParams = new Dictionary<string, string>();
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
      if (actionTypes != null)
        queryParams.Add("actionTypes", Convert.ToString(actionTypes));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<AuditLog>>(path: path,
                                                                        routeParams: routeParams,
                                                                        queryParams: queryParams,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<AuditLog>> GetAuditLogs(int? pageSize = 10,
                                                       int? page = 0,
                                                       string textSearch = null,
                                                       string sortProperty = null,
                                                       string sortOrder = null,
                                                       long? startTime = null,
                                                       long? endTime = null,
                                                       string actionTypes = null,
                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/audit/logs";
      var queryParams = new Dictionary<string, string>();
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
      if (actionTypes != null)
        queryParams.Add("actionTypes", Convert.ToString(actionTypes));
      if (pageSize != null)
        queryParams.Add("pageSize", Convert.ToString(pageSize));
      if (page != null)
        queryParams.Add("page", Convert.ToString(page));
      var result = await restClientService.GetAsync<PageData<AuditLog>>(path: path,
                                                                        queryParams: queryParams,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
  }
}