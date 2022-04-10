using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using core.Authentication;
using core.Autofac;
using Microsoft.Extensions.Configuration;
using petit.Models.Assets;
using petit.Models.ThingsBoard;
using petit.Models.Users;
using petit.Services.Core;
using petit.Services.ThingsBoard;
namespace petit.Services
{
  public interface IAssetApiService : IScopedDependency
  {
    Task<IList<AssetResult>> GetAssetResults(CancellationToken cancellationToken = default);
    Task<AssetResult> GetAssetResult(string id, CancellationToken cancellationToken = default);
    Task<Asset> AddAsset(Asset asset, Customer customer = null, CancellationToken cancellationToken = default);
    Task<Asset> GetAsset(string id, bool checkOwner = true, bool checkAccess = true, CancellationToken cancellationToken = default);
    Task<Asset> EditAsset(Asset asset, CancellationToken cancellationToken = default);
    Task DeleteAsset(string id, CancellationToken cancellationToken = default);
    Task<ShareAssetResult> ShareAsset(string id, string phone, CancellationToken cancellationToken = default);
    Task VerifyShareAsset(string sharingToken, CancellationToken cancellationToken = default);
    Task<ICollection<ProfileResult>> BetweenWhomShared(string assetId, CancellationToken cancellationToken = default);
    Task<Customer> GetAssetCustomer(string assetId, CancellationToken cancellationToken = default);
    Task<ICollection<Customer>> GetAssetContains(Asset asset, CancellationToken cancellationToken = default);
  }
  public class AssetApiService : IAssetApiService
  {
    #region Fields
    private readonly ICurrentContext currentContext;
    private readonly IEntityRelationService entityRelationService;
    private readonly ICustomerService customerService;
    private readonly IUserService userService;
    private readonly TokenSetting sharingTokenSetting;
    private readonly ITokenManagerService tokenManagerService;
    private readonly IPetitErrorFactory petitErrorFactory;
    private readonly IAssetService assetService;

    #endregion
    public AssetApiService(ICurrentContext currentContext,
                           IEntityRelationService entityRelationService,
                           ICustomerService customerService,
                           IConfiguration configuration,
                           IUserService userService,
                           ITokenManagerService tokenManagerService,
                           IPetitErrorFactory petitErrorFactory,
                           IAssetService assetService)
    {
      this.currentContext = currentContext;
      this.entityRelationService = entityRelationService;
      this.customerService = customerService;
      this.userService = userService;
      this.sharingTokenSetting = configuration.GetSection("SharingTokenSetting").Get<TokenSetting>();
      this.tokenManagerService = tokenManagerService;
      this.petitErrorFactory = petitErrorFactory;
      this.assetService = assetService;
    }
    private static AssetResult ToAssetResult(Asset asset)
    {
      return new AssetResult
      {
        Id = asset.Id.Id,
        Name = asset.Name,
        Type = asset.Type,
        Label = asset.Label,
        ManagerId = asset.CustomerId.Id,
        OwnerId = asset.AdditionalInfo?.GetValueOrDefault("Owner"),
      };
    }
    private static ProfileResult ToCustomerResult(Customer customer)
    {
      return new ProfileResult
      {
        Id = customer.Id.Id,
        FirstName = customer.AdditionalInfo.GetValueOrDefault("FirstName"),
        LastName = customer.AdditionalInfo.GetValueOrDefault("LastName"),
        Email = customer.Email,
        Phone = customer.Phone
      };
    }
    public async Task<IList<AssetResult>> GetAssetResults(CancellationToken cancellationToken = default)
    {
      var customerId = currentContext.GetCurrentUserId();
      var assetIds = await entityRelationService.FindByFrom(fromId: customerId,
                                                            fromType: EntityType.Customer,
                                                            relationTypeGroup: EntityRelationTypeGroup.Common,
                                                            cancellationToken: cancellationToken);
      var ids = string.Join(",", assetIds.Where(x => x.To.EntityType == EntityType.Asset).Select(x => x.To.Id));
      var assets = await assetService.GetAssetsByIds(assetIds: ids, cancellationToken: cancellationToken);
      if (assets == null)
        return null;
      var result = assets.Select(x => ToAssetResult(x));
      return result.ToList();
    }
    public async Task<AssetResult> GetAssetResult(string id, CancellationToken cancellationToken = default)
    {
      var asset = await GetAsset(id: id,
                                 checkOwner: false,
                                 checkAccess: true,
                                 cancellationToken: cancellationToken);
      if (asset == null)
        return null;
      var result = ToAssetResult(asset);
      return result;
    }
    public async Task<Asset> GetAsset(string id, bool checkOwner = true, bool checkAccess = true, CancellationToken cancellationToken = default)
    {
      var customerId = currentContext.GetCurrentUserId();
      var asset = await assetService.GetAssetById(assetId: id, cancellationToken: cancellationToken);
      if (asset == null)
        return null;
      if (checkOwner)
      {
        string owner = null;
        if (asset.AdditionalInfo != null)
          owner = asset.AdditionalInfo?.GetValueOrDefault("Owner");
        if (owner != customerId)
          throw petitErrorFactory.CustomerMismatch();
      }
      if (checkAccess)
      {
        var accessKey = $"C-{customerId}-Access";
        if (asset.AdditionalInfo == null || !asset.AdditionalInfo.ContainsKey(accessKey))
          throw petitErrorFactory.AccessDenied();
      }
      return asset;
    }
    public async Task<Asset> AddAsset(Asset asset, Customer customer = null, CancellationToken cancellationToken = default)
    {
      var customerId = customer == null ? currentContext.GetCurrentUserId() : customer.Id.Id;

      asset.Name = $"C:{customerId}-A:{asset.Label}";
      asset.AdditionalInfo = new Dictionary<string, string>
      {
        { "Owner", customerId } ,
        { $"C-{customerId}-Access" , ""}
      };
      asset = await assetService.SaveAsset(asset: asset, cancellationToken: cancellationToken);
      var relation = new EntityRelation()
      {
        TypeGroup = EntityRelationTypeGroup.Common,
        From = new CustomerId { Id = customerId },
        To = new AssetId { Id = asset.Id.Id },
        Type = "Manages"
      };
      await entityRelationService.SaveRelation(relation: relation,
                                               cancellationToken: cancellationToken);
      var assetCustomer = await customerService.AddAssetCustomer(asset: asset,
                                                                 cancellationToken: cancellationToken);
      asset = await assetService.AssignAssetToCustomer(assetId: asset.Id.Id,
                                                       customerId: assetCustomer.Id.Id,
                                                       cancellationToken: cancellationToken);
      await userService.AddAssetUser(asset: asset, customer: customer, cancellationToken: cancellationToken);
      return asset;
    }
    public async Task<Asset> EditAsset(Asset asset, CancellationToken cancellationToken = default)
    {
      var customerId = currentContext.GetCurrentUserId();
      asset.Name = $"C:{customerId}-A:{asset.Label}";
      asset = await assetService.SaveAsset(asset: asset, cancellationToken: cancellationToken);
      return asset;
    }
    public async Task DeleteAsset(string id, CancellationToken cancellationToken = default)
    {
      await GetAsset(id: id, cancellationToken: cancellationToken);
      await assetService.DeleteAsset(assetId: id, cancellationToken: cancellationToken);
    }
    public async Task<ShareAssetResult> ShareAsset(string id, string phone, CancellationToken cancellationToken)
    {
      var asset = await GetAsset(id: id, cancellationToken: cancellationToken);
      if (!FormatService.PhoneRegEx(phone))
      {
        throw petitErrorFactory.PhoneFormatError();
      }
      phone = FormatService.PhoneInternationalization(phone);
      var sharekey = "share with (" + phone + ")";
      if (asset.AdditionalInfo != null && asset.AdditionalInfo.ContainsKey(sharekey))
        throw petitErrorFactory.AssetAlreadyShared();
      var claims = new List<Claim>
      {
        new Claim("phone", phone),
        new Claim("asset-id", asset.Id.Id),
        new Claim("date", DateTime.UtcNow.ToString()),
        new Claim("token-type",  TokenType.Sharing.ToString())
      };
      var token = await tokenManagerService.GenerateToken(tokenSetting: sharingTokenSetting,
                                                          claims: claims.ToArray());
      return new ShareAssetResult() { SharingToken = token };
    }
    public async Task VerifyShareAsset(string sharingToken, CancellationToken cancellationToken)
    {
      var claimsPrincipal = await tokenManagerService.ValidateToken(token: sharingToken,
                                                                    tokenSetting: sharingTokenSetting);
      var phone = claimsPrincipal.FindFirstValue("phone");
      var assetId = claimsPrincipal.FindFirstValue("asset-id");
      var tokenTypeValue = claimsPrincipal.FindFirstValue("token-type");
      if (tokenTypeValue != TokenType.Sharing.ToString())
        throw petitErrorFactory.InvalidToken();
      var customer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);
      if (customer.Name != phone || customer.Phone != phone)
        throw petitErrorFactory.InvalidToken();
      var asset = await GetAsset(id: assetId,
                                 checkOwner: false,
                                 checkAccess: false,
                                 cancellationToken: cancellationToken);
      var sharekey = "share with (" + phone + ")";
      if (asset.AdditionalInfo != null && asset.AdditionalInfo.ContainsKey(sharekey))
        throw petitErrorFactory.AssetAlreadyShared();
      else
      {
        if (asset.AdditionalInfo == null)
          asset.AdditionalInfo = new Dictionary<string, string>();
        asset.AdditionalInfo.Add(sharekey, phone);
        asset.AdditionalInfo.Add($"C-{customer.Id.Id}-Access", "");
        await EditAsset(asset: asset, cancellationToken: cancellationToken);
        var relation = new EntityRelation()
        {
          TypeGroup = EntityRelationTypeGroup.Common,
          From = new CustomerId { Id = customer.Id.Id },
          To = new AssetId { Id = asset.Id.Id },
          Type = "Contains"
        };
        await entityRelationService.SaveRelation(relation: relation, cancellationToken: cancellationToken);
        await userService.AddAssetUser(asset: asset, cancellationToken: cancellationToken);
      }
    }

    public Task<Customer> GetAssetCustomer(string assetId, CancellationToken cancellationToken = default)
    {
      throw new NotImplementedException();
    }


    public async Task<ICollection<ProfileResult>> BetweenWhomShared(string assetId, CancellationToken cancellationToken = default)
    {
      var asset = await GetAsset(id: assetId, cancellationToken: cancellationToken);
      var customers = GetAssetContains(asset);
      return customers.Result.Select(x => ToCustomerResult(x)).ToList();
    }

    public async Task<ICollection<Customer>> GetAssetContains(Asset asset, CancellationToken cancellationToken = default)
    {
      var assetRelations = await entityRelationService.FindByTo(toId: asset.Id.Id,
                                                                toType: EntityType.Asset,
                                                                relationTypeGroup: EntityRelationTypeGroup.Common,
                                                                cancellationToken: cancellationToken);
      var assetContains = assetRelations.Where(x => x.Type == "Contains").ToList();
      ICollection<Customer> customers = new List<Customer>();
      foreach (var contain in assetContains)
        customers.Add(await customerService.GetCustomerById(contain.From.Id));
      return customers;
    }
  }
}