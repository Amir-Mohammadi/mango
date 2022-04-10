using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using core.Autofac;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using petit.Models.Common;
using petit.Models.Users;
using petit.Services.Core;
namespace petit.Services.RestClients
{
  public interface IRestClientService : ISingletonDependency
  {
    #region Get
    Task<T> GetAsync<T>(string path,
                        Dictionary<string, string> queryParams = null,
                        Dictionary<string, string> routeParams = null,
                        AuthenticationResult token = null,
                        CancellationToken cancellationToken = default);
    #endregion
    #region Post
    Task<T> PostAsync<T>(string path,
                         Dictionary<string, string> routeParams = null,
                         Dictionary<string, string> queryParams = null,
                         object body = null,
                         AuthenticationResult token = null,
                         CancellationToken cancellationToken = default);
    Task<HttpResponseMessage> PostAsync(string path,
                                        Dictionary<string, string> routeParams = null,
                                        Dictionary<string, string> queryParams = null,
                                        object body = null,
                                        AuthenticationResult token = null,
                                        CancellationToken cancellationToken = default);
    #endregion
    #region Put
    Task<T> PutAsync<T>(string path,
                        Dictionary<string, string> routeParams = null,
                        Dictionary<string, string> queryParams = null,
                        object body = null,
                        AuthenticationResult token = null,
                        CancellationToken cancellationToken = default);
    Task<HttpResponseMessage> PutAsync(string path,
                                       Dictionary<string, string> routeParams = null,
                                       Dictionary<string, string> queryParams = null,
                                       object body = null,
                                       AuthenticationResult token = null,
                                       CancellationToken cancellationToken = default);
    #endregion
    #region Delete
    Task<HttpResponseMessage> DeleteAsync(string path,
                                          Dictionary<string, string> routeParams = null,
                                          Dictionary<string, string> queryParams = null,
                                          AuthenticationResult token = null,
                                          CancellationToken cancellationToken = default);
    Task<T> DeleteAsync<T>(string path,
                           Dictionary<string, string> routeParams = null,
                           Dictionary<string, string> queryParams = null,
                           AuthenticationResult token = null,
                           CancellationToken cancellationToken = default);
    #endregion
    #region Authenticate
    //Task RefreshToken(CancellationToken cancellationToken = default);
    #endregion
    object SerializeObject(object obj);
  }
  public class RestClientService : IRestClientService
  {
    private AuthenticationResult authenticationResult;
    private readonly string serverAddress;
    private DateTime? tokeGenerateDateTime;
    private readonly int refreshTokenDateTime;
    private readonly IPetitErrorFactory petitErrorFactory;
    public RestClientService(IConfiguration configuration,
                             IPetitErrorFactory petitErrorFactory)
    {
      var setting = configuration.GetSection(nameof(ThingsBoardSetting)).Get<ThingsBoardSetting>();
      this.serverAddress = setting.ServerAddress;
      this.petitErrorFactory = petitErrorFactory;
      this.refreshTokenDateTime = setting.RefreshTokenDateTime;
      Login(username: setting.AdminUserName, password: setting.AdminPassword).GetAwaiter().GetResult();
    }
    #region private
    private HttpClient GetHttpClient(AuthenticationResult token)
    {
      var httpClient = new HttpClient();
      var currentToken = token ?? authenticationResult;
      if (!string.IsNullOrEmpty(currentToken?.Token))
        httpClient.DefaultRequestHeaders.Add("X-Authorization", "Bearer " + currentToken?.Token);
      httpClient.BaseAddress = new Uri(serverAddress);
      return httpClient;
    }
    private async Task Login(string username, string password)
    {
      var path = "/api/auth/login";
      var body = new { username, password };
      var result = await PostAsync<AuthenticationResult>(path: path,
                                                         body: body);
      result.TokenType = TokenType.Auth;
      authenticationResult = result;
      tokeGenerateDateTime = DateTime.Now;
    }
    private static string CreateUri(string path,
                                    Dictionary<string, string> queryParams = null,
                                    Dictionary<string, string> routeParams = null)
    {
      var uri = path;
      if (routeParams != null)
        foreach (var routeParam in routeParams)
          uri = uri.Replace("{" + routeParam.Key + "}", routeParam.Value);
      if (queryParams != null && queryParams.Any())
      {
        var qParams = new FormUrlEncodedContent(queryParams).ReadAsStringAsync().Result;
        uri += "?" + qParams;
      }
      return uri;
    }
    private static HttpContent CreateContnet(object body)
    {
      if (body == null)
        return null;

      DefaultContractResolver contractResolver = new DefaultContractResolver
      {
        NamingStrategy = new CamelCaseNamingStrategy()
      };

      JsonSerializerSettings options = new JsonSerializerSettings
      {
        ContractResolver = contractResolver,
        Converters = {
        new StringEnumConverter()
        }
      };
      var jsonBody = Newtonsoft.Json.JsonConvert.SerializeObject(body, Formatting.None, options);

      return new StringContent(jsonBody, Encoding.UTF8, "application/json");
    }
    #endregion
    #region Get
    public async Task<T> GetAsync<T>(string path,
                                     Dictionary<string, string> queryParams = null,
                                     Dictionary<string, string> routeParams = null,
                                     AuthenticationResult token = null,
                                     CancellationToken cancellationToken = default)
    {
      RefreshToken().GetAwaiter().GetResult();
      var httpClient = GetHttpClient(token);
      var uri = CreateUri(path: path, routeParams: routeParams, queryParams: queryParams);
      var response = await httpClient.GetAsync(requestUri: uri, cancellationToken: cancellationToken);
      if (!response.IsSuccessStatusCode) return default;

      var result = await response.Content.ReadAsAsync<T>(cancellationToken: cancellationToken);
      return result;
    }
    #endregion
    #region Post
    public async Task<T> PostAsync<T>(string path,
                                      Dictionary<string, string> routeParams = null,
                                      Dictionary<string, string> queryParams = null,
                                      object body = null,
                                      AuthenticationResult token = null,
                                      CancellationToken cancellationToken = default)
    {
      var response = await PostAsync(path: path,
                                     routeParams: routeParams,
                                     queryParams: queryParams,
                                     body: body,
                                     token: token,
                                     cancellationToken: cancellationToken);
      if (!response.IsSuccessStatusCode)
        throw petitErrorFactory.RpcTimeout();
      var result = await response.Content.ReadAsAsync<T>(cancellationToken: cancellationToken);
      return result;
    }
    public async Task<HttpResponseMessage> PostAsync(string path,
                                                     Dictionary<string, string> routeParams = null,
                                                     Dictionary<string, string> queryParams = null,
                                                     object body = null,
                                                     AuthenticationResult token = null,
                                                     CancellationToken cancellationToken = default)
    {
      RefreshToken().GetAwaiter().GetResult();
      var httpClient = GetHttpClient(token);
      var uri = CreateUri(path: path, routeParams: routeParams, queryParams: queryParams);
      HttpContent content = CreateContnet(body: body);
      var response = await httpClient.PostAsync(requestUri: uri, content: content, cancellationToken: cancellationToken);
      return response;
    }
    #endregion
    #region Put
    public async Task<T> PutAsync<T>(string path,
                                     Dictionary<string, string> routeParams = null,
                                     Dictionary<string, string> queryParams = null,
                                     object body = null,
                                     AuthenticationResult token = null,
                                     CancellationToken cancellationToken = default)
    {
      var response = await PutAsync(path: path,
                                    routeParams: routeParams,
                                    queryParams: queryParams,
                                    body: body,
                                    token: token,
                                    cancellationToken: cancellationToken);
      if (!response.IsSuccessStatusCode)
        return default;
      var result = await response.Content.ReadAsAsync<T>(cancellationToken: cancellationToken);
      return result;
    }
    public async Task<HttpResponseMessage> PutAsync(string path,
                                                    Dictionary<string, string> routeParams = null,
                                                    Dictionary<string, string> queryParams = null,
                                                    object body = null,
                                                    AuthenticationResult token = null,
                                                    CancellationToken cancellationToken = default)
    {
      RefreshToken().GetAwaiter().GetResult();
      var httpClient = GetHttpClient(token);
      var uri = CreateUri(path: path, routeParams: routeParams, queryParams: queryParams);
      HttpContent content = CreateContnet(body: body);
      var response = await httpClient.PutAsync(requestUri: uri, content: content, cancellationToken: cancellationToken);
      return response;
    }
    #endregion
    #region Delete
    public async Task<HttpResponseMessage> DeleteAsync(string path,
                                                       Dictionary<string, string> routeParams = null,
                                                       Dictionary<string, string> queryParams = null,
                                                       AuthenticationResult token = null,
                                                       CancellationToken cancellationToken = default)
    {
      RefreshToken().GetAwaiter().GetResult();
      var httpClient = GetHttpClient(token);
      var uri = CreateUri(path: path, routeParams: routeParams, queryParams: queryParams);
      var response = await httpClient.DeleteAsync(requestUri: uri, cancellationToken: cancellationToken);
      return response;
    }
    public async Task<T> DeleteAsync<T>(string path,
                                        Dictionary<string, string> routeParams = null,
                                        Dictionary<string, string> queryParams = null,
                                        AuthenticationResult token = null,
                                        CancellationToken cancellationToken = default)
    {
      var response = await DeleteAsync(path: path,
                                       routeParams: routeParams,
                                       queryParams: queryParams,
                                       token: token,
                                       cancellationToken: cancellationToken);
      if (!response.IsSuccessStatusCode)
        return default;
      var result = await response.Content.ReadAsAsync<T>(cancellationToken: cancellationToken);
      return result;
    }
    #endregion
    #region Authenticate    
    private async Task RefreshToken()
    {
      if (tokeGenerateDateTime.HasValue && (DateTime.Now.Subtract(tokeGenerateDateTime.Value).TotalMinutes > refreshTokenDateTime))
      {
        tokeGenerateDateTime = DateTime.Now;
        var path = "/api/auth/token";
        var body = new { authenticationResult.RefreshToken };
        var result = await PostAsync<AuthenticationResult>(path: path,
                                                           body: body);
        result.TokenType = TokenType.Auth;
        authenticationResult = result;
        tokeGenerateDateTime = DateTime.Now;
      }
    }
    public object SerializeObject(object obj)
    {
      return obj;
    }
    #endregion
  }
}