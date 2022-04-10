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
  public interface IRuleChainService : IScopedDependency
  {
    Task DeleteRuleChain(string ruleChainId, CancellationToken cancellationToken = default);
    Task<RuleChainData> ExportRuleChains(string limit, CancellationToken cancellationToken = default);
    Task<string> GetLatestRuleNodeDebugInput(string ruleNodeId, CancellationToken cancellationToken = default);
    Task<RuleChain> GetRuleChainById(string ruleChainId, CancellationToken cancellationToken = default);
    Task<RuleChainMetaData> GetRuleChainMetaData(string ruleChainId, CancellationToken cancellationToken = default);
    Task<PageData<RuleChain>> GetRuleChains(int? pageSize = 10,
                                            int? page = 0,
                                            string textSearch = null,
                                            string sortProperty = null,
                                            string sortOrder = null,
                                            CancellationToken cancellationToken = default);
    Task ImportRuleChains(RuleChainData ruleChainData, bool? overwrite, CancellationToken cancellationToken = default);
    Task<RuleChainMetaData> SaveRuleChainMetaData(RuleChainMetaData ruleChainMetaData, CancellationToken cancellationToken = default);
    Task<RuleChain> SaveRuleChain(DefaultRuleChainCreateRequest request, CancellationToken cancellationToken = default);
    Task<RuleChain> SaveRuleChain1(RuleChain ruleChain, CancellationToken cancellationToken = default);
    Task<RuleChain> SetRootRuleChain(string ruleChainId, CancellationToken cancellationToken = default);
    Task<string> TestScript(string inputParams, CancellationToken cancellationToken = default);
  }
  public class RuleChainService : IRuleChainService
  {
    public RuleChainService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteRuleChain(string ruleChainId, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/{ruleChainId}";
      var routeParams = new Dictionary<string, string> { { "ruleChainId", ruleChainId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<RuleChainData> ExportRuleChains(string limit, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChains/export";
      var queryParams = new Dictionary<string, string>();
      if (limit != null)
        queryParams.Add("limit", Convert.ToString(limit));
      var result = await restClientService.GetAsync<RuleChainData>(path: path,
                                                                   queryParams: queryParams,
                                                                   cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> GetLatestRuleNodeDebugInput(string ruleNodeId, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleNode/{ruleNodeId}/debugIn";
      var routeParams = new Dictionary<string, string> { { "ruleNodeId", ruleNodeId } };
      var result = await restClientService.GetAsync<string>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<RuleChain> GetRuleChainById(string ruleChainId, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/{ruleChainId}";
      var routeParams = new Dictionary<string, string> { { "ruleChainId", ruleChainId } };
      var result = await restClientService.GetAsync<RuleChain>(path: path,
                                                               routeParams: routeParams,
                                                               cancellationToken: cancellationToken);
      return result;
    }
    public async Task<RuleChainMetaData> GetRuleChainMetaData(string ruleChainId, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/{ruleChainId}/metadata";
      var routeParams = new Dictionary<string, string> { { "ruleChainId", ruleChainId } };
      var result = await restClientService.GetAsync<RuleChainMetaData>(path: path,
                                                                       routeParams: routeParams,
                                                                       cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<RuleChain>> GetRuleChains(int? pageSize = 10,
                                                         int? page = 0,
                                                         string textSearch = null,
                                                         string sortProperty = null,
                                                         string sortOrder = null,
                                                         CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChains";
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
      var result = await restClientService.GetAsync<PageData<RuleChain>>(path: path,
                                                                         queryParams: queryParams,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task ImportRuleChains(RuleChainData ruleChainData, bool? overwrite, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChains/import";
      var queryParams = new Dictionary<string, string>();
      if (overwrite != null)
        queryParams.Add("overwrite", Convert.ToString(overwrite));
      var body = restClientService.SerializeObject(ruleChainData);
      await restClientService.PostAsync(path: path, queryParams: queryParams, body: body, cancellationToken: cancellationToken);
    }
    public async Task<RuleChainMetaData> SaveRuleChainMetaData(RuleChainMetaData ruleChainMetaData, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/metadata";
      var body = restClientService.SerializeObject(ruleChainMetaData);
      var result = await restClientService.PostAsync<RuleChainMetaData>(path: path,
                                                                        body: body,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<RuleChain> SaveRuleChain(DefaultRuleChainCreateRequest request, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/device/default";
      var body = restClientService.SerializeObject(request);
      var result = await restClientService.PostAsync<RuleChain>(path: path,
                                                                body: body,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<RuleChain> SaveRuleChain1(RuleChain ruleChain, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain";
      var body = restClientService.SerializeObject(ruleChain);
      var result = await restClientService.PostAsync<RuleChain>(path: path,
                                                                body: body,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<RuleChain> SetRootRuleChain(string ruleChainId, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/{ruleChainId}/root";
      var routeParams = new Dictionary<string, string> { { "ruleChainId", ruleChainId } };
      var result = await restClientService.PostAsync<RuleChain>(path: path,
                                                                routeParams: routeParams,
                                                                cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> TestScript(string inputParams, CancellationToken cancellationToken = default)
    {
      var path = "/api/ruleChain/testScript";
      var body = restClientService.SerializeObject(inputParams);
      var result = await restClientService.PostAsync<string>(path: path,
                                                             body: body,
                                                             cancellationToken: cancellationToken);
      return result;
    }
  }
}