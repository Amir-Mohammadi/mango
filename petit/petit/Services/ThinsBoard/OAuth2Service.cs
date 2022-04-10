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
  public interface IOAuth2Service : IScopedDependency
  {
    Task<OAuth2ClientsParams> GetCurrentOAuth2Params(CancellationToken cancellationToken = default);
    Task<string> GetLoginProcessingUrl(CancellationToken cancellationToken = default);
    Task<List<OAuth2ClientInfo>> GetOAuth2Clients(CancellationToken cancellationToken = default);
    Task<OAuth2ClientsParams> SaveOAuth2Params(OAuth2ClientsParams oauth2Params, CancellationToken cancellationToken = default);
  }
  public class OAuth2Service : IOAuth2Service
  {
    public OAuth2Service(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<OAuth2ClientsParams> GetCurrentOAuth2Params(CancellationToken cancellationToken = default)
    {
      var path = "/api/oauth2/config";
      var result = await restClientService.GetAsync<OAuth2ClientsParams>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> GetLoginProcessingUrl(CancellationToken cancellationToken = default)
    {
      var path = "/api/oauth2/loginProcessingUrl";
      var result = await restClientService.GetAsync<string>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<OAuth2ClientInfo>> GetOAuth2Clients(CancellationToken cancellationToken = default)
    {
      var path = "/api/noauth/oauth2Clients";
      var result = await restClientService.PostAsync<List<OAuth2ClientInfo>>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<OAuth2ClientsParams> SaveOAuth2Params(OAuth2ClientsParams oauth2Params, CancellationToken cancellationToken = default)
    {
      var path = "/api/oauth2/config";
      var body = restClientService.SerializeObject(oauth2Params);
      var result = await restClientService.PostAsync<OAuth2ClientsParams>(path: path, body: body, cancellationToken: cancellationToken);
      return result;
    }
  }
}