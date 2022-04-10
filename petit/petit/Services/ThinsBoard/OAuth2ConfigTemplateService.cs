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
  public interface IOAuth2ConfigTemplateService : IScopedDependency
  {
    Task DeleteClientRegistrationTemplate(string clientRegistrationTemplateId, CancellationToken cancellationToken = default);
    Task<List<OAuth2ClientRegistrationTemplate>> GetClientRegistrationTemplates(CancellationToken cancellationToken = default);
    Task<OAuth2ClientRegistrationTemplate> SaveClientRegistrationTemplate(OAuth2ClientRegistrationTemplate clientRegistrationTemplate, CancellationToken cancellationToken = default);
  }
  public class OAuth2ConfigTemplateService : IOAuth2ConfigTemplateService
  {
    public OAuth2ConfigTemplateService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteClientRegistrationTemplate(string clientRegistrationTemplateId, CancellationToken cancellationToken = default)
    {
      var path = "/api/oauth2/config/template/{clientRegistrationTemplateId}";
      var routeParams = new Dictionary<string, string> { { "clientRegistrationTemplateId", clientRegistrationTemplateId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<List<OAuth2ClientRegistrationTemplate>> GetClientRegistrationTemplates(CancellationToken cancellationToken = default)
    {
      var path = "/api/oauth2/config/template";
      var result = await restClientService.GetAsync<List<OAuth2ClientRegistrationTemplate>>(path: path, cancellationToken: cancellationToken);
      return result;
    }
    public async Task<OAuth2ClientRegistrationTemplate> SaveClientRegistrationTemplate(OAuth2ClientRegistrationTemplate clientRegistrationTemplate, CancellationToken cancellationToken = default)
    {
      var path = "/api/oauth2/config/template";
      var body = restClientService.SerializeObject(clientRegistrationTemplate);
      var result = await restClientService.PostAsync<OAuth2ClientRegistrationTemplate>(path: path,
                                                                                       body: body,
                                                                                       cancellationToken: cancellationToken);
      return result;
    }
  }
}