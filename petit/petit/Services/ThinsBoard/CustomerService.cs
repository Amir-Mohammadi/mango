using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
using petit.Services.Core;
using petit.Models.AdditionalInfos;
using Microsoft.AspNetCore.Http;
using petit.Domains.Files;

namespace petit.Services.ThingsBoard
{
  public partial interface ICustomerService : IScopedDependency
  {
    Task DeleteCustomer(string customerId, CancellationToken cancellationToken = default);
    Task<Customer> GetCustomerById(string customerId, CancellationToken cancellationToken = default);
    Task<string> GetCustomerTitleById(string customerId, CancellationToken cancellationToken = default);
    Task<PageData<Customer>> GetCustomers(int? pageSize = 10,
                                          int? page = 0,
                                          string textSearch = null,
                                          string sortProperty = null,
                                          string sortOrder = null,
                                          CancellationToken cancellationToken = default);
    Task<string> GetShortCustomerInfoById(string customerId, CancellationToken cancellationToken = default);
    Task<Customer> GetTenantCustomer(string customerTitle, CancellationToken cancellationToken = default);
    Task<Customer> SaveCustomer(Customer customer, CancellationToken cancellationToken = default);
    Task<Customer> GetCustomerByPhone(string phone, CancellationToken cancellationToken = default);
    Task<Customer> Register(string phone, string firstName, string lastName, string email, CancellationToken cancellationToken = default);
    Task<Customer> GetCurrentCustomer(CancellationToken cancellationToken = default);
    Task<Customer> AddAssetCustomer(Asset asset, CancellationToken cancellationToken = default);
  }
  public class CustomerService : ICustomerService
  {
    public CustomerService(IRestClientService restClientService,
                           ICurrentContext currentContext,
                           IFileService fileService)
    {
      this.restClientService = restClientService;
      this.currentContext = currentContext;
      this.fileService = fileService;
    }
    private readonly IRestClientService restClientService;
    private readonly ICurrentContext currentContext;
    private readonly IFileService fileService;
    public async Task DeleteCustomer(string customerId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      await restClientService.DeleteAsync(path: path,
                                          routeParams: routeParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task<Customer> GetCustomerById(string customerId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var result = await restClientService.GetAsync<Customer>(path: path,
                                                              routeParams: routeParams,
                                                              cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> GetCustomerTitleById(string customerId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/title";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var result = await restClientService.GetAsync<string>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<PageData<Customer>> GetCustomers(int? pageSize = 10,
                                                       int? page = 0,
                                                       string textSearch = null,
                                                       string sortProperty = null,
                                                       string sortOrder = null,
                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/customers";
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
      var result = await restClientService.GetAsync<PageData<Customer>>(path: path,
                                                                        queryParams: queryParams,
                                                                        cancellationToken: cancellationToken);
      return result;
    }
    public async Task<string> GetShortCustomerInfoById(string customerId, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer/{customerId}/shortInfo";
      var routeParams = new Dictionary<string, string> { { "customerId", customerId } };
      var result = await restClientService.GetAsync<string>(path: path,
                                                            routeParams: routeParams,
                                                            cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Customer> GetTenantCustomer(string customerTitle, CancellationToken cancellationToken = default)
    {
      var path = "/api/tenant/customers";
      var queryParams = new Dictionary<string, string>();
      if (customerTitle != null)
        queryParams.Add("customerTitle", Convert.ToString(customerTitle));
      var result = await restClientService.GetAsync<Customer>(path: path,
                                                              queryParams: queryParams,
                                                              cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Customer> SaveCustomer(Customer customer, CancellationToken cancellationToken = default)
    {
      var path = "/api/customer";
      var body = restClientService.SerializeObject(customer);
      var result = await restClientService.PostAsync<Customer>(path: path,
                                                               body: body,
                                                               cancellationToken: cancellationToken);
      return result;
    }
    public async Task<Customer> GetCustomerByPhone(string phone, CancellationToken cancellationToken = default)
    {
      return await GetTenantCustomer(customerTitle: phone, cancellationToken: cancellationToken);
    }
    public async Task<Customer> Register(string phone, string firstName, string lastName, string email, CancellationToken cancellationToken = default)
    {
      var customer = new Customer
      {
        Title = phone,
        Name = phone,
        Phone = phone,
        Email = email,
        AdditionalInfo = new Dictionary<string, string>{
          {"FirstName" , firstName} ,
          {"LastName" , lastName},
          {"ProfileImageId", null}
        }
      };
      return await SaveCustomer(customer: customer, cancellationToken: cancellationToken);
    }
    public async Task<Customer> GetCurrentCustomer(CancellationToken cancellationToken = default)
    {
      var userId = currentContext.GetCurrentUserId();
      return await GetCustomerById(customerId: userId, cancellationToken: cancellationToken);
    }
    public async Task<Customer> AddAssetCustomer(Asset asset, CancellationToken cancellationToken = default)
    {
      var assetCustomer = new Customer() { Title = $"A:{asset.Id.Id}-Manager", };
      assetCustomer = await SaveCustomer(customer: assetCustomer, cancellationToken: cancellationToken);
      return assetCustomer;
    }
  }
}