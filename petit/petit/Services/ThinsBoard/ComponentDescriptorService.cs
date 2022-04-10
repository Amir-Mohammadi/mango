using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IComponentDescriptorService : IScopedDependency
  {
    Task<ComponentDescriptor> GetComponentDescriptorByClazz(string componentDescriptorClazz, CancellationToken cancellationToken = default);
    Task<List<ComponentDescriptor>> GetComponentDescriptorsByType(string componentType, CancellationToken cancellationToken = default);
    Task<List<ComponentDescriptor>> GetComponentDescriptorsByTypes(string componentTypes, CancellationToken cancellationToken = default);
  }
  public class ComponentDescriptorService : IComponentDescriptorService
  {
    public ComponentDescriptorService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task<ComponentDescriptor> GetComponentDescriptorByClazz(string componentDescriptorClazz, CancellationToken cancellationToken = default)
    {
      var path = "/api/component/{componentDescriptorClazz}";
      var routeParams = new Dictionary<string, string> { { "componentDescriptorClazz", componentDescriptorClazz } };
      var result = await restClientService.GetAsync<ComponentDescriptor>(path: path,
                                                                         routeParams: routeParams,
                                                                         cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<ComponentDescriptor>> GetComponentDescriptorsByType(string componentType, CancellationToken cancellationToken = default)
    {
      var path = "/api/components/{componentType}";
      var routeParams = new Dictionary<string, string> { { "componentType", componentType } };
      var result = await restClientService.GetAsync<List<ComponentDescriptor>>(path: path,
                                                                               routeParams: routeParams,
                                                                               cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<ComponentDescriptor>> GetComponentDescriptorsByTypes(string componentTypes, CancellationToken cancellationToken = default)
    {
      var path = "/api/components";
      var queryParams = new Dictionary<string, string>();
      if (componentTypes != null)
        queryParams.Add("componentTypes", Convert.ToString(componentTypes));
      var result = await restClientService.GetAsync<List<ComponentDescriptor>>(path: path,
                                                                               queryParams: queryParams,
                                                                               cancellationToken: cancellationToken);
      return result;
    }
  }
}