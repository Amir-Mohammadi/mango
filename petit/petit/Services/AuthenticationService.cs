using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using core.Authentication;
using core.Autofac;
using core.Crypto;
using core.Messaging;
using core.Models;
using core.Setting;
using core.StateManager;
using Microsoft.AspNetCore.Http;
using petit.Domains.Files;
using petit.Models.Assets;
using petit.Models.ThingsBoard;
using petit.Models.Users;
using petit.Services.Core;
using petit.Services.Core.Localizer;
using petit.Services.ThingsBoard;

namespace petit.Services
{
  public interface IAuthenticationService : IScopedDependency
  {
    Task<AuthenticationResult> Authenticate(string phone, CancellationToken cancellationToken = default);
    Task<AuthenticationResult> VerifyAuthenticate(string verificationCode, string verificationToken, CancellationToken cancellationToken = default);
    Task<AuthenticationResult> FastLoginForDebug(string phoneNumber, CancellationToken cancellationToken = default);
    Task<AuthenticationResult> Register(string firstName, string lastName, string email, string registerToken, CancellationToken cancellationToken = default);
    Task Logout();
    Task<ProfileResult> GetUserProfile(CancellationToken cancellationToken);
    Task<ProfileResult> EditUserProfile(string firstName, string lastName, string email, Guid? profileImageId, CancellationToken cancellationToken);
    Task<AuthenticationResult> EditUserProfilePhone(string phone, CancellationToken cancellationToken);
    Task<AuthenticationResult> VerifyUserProfilePhone(string verificationCode, string verificationToken, CancellationToken cancellationToken);
    Task DeleteCurrentUser(CancellationToken cancellationToken);
  }
  public class AuthenticationService : IAuthenticationService
  {
    #region Fields
    private readonly ISiteSettingProvider siteSettingProvider;
    private readonly ICustomerService customerService;
    private readonly ILocalizer localizer;
    private readonly IStateManagerService stateManagerService;
    private readonly IPetitErrorFactory petitErrorFactory;
    private readonly IMessagingService messagingService;
    private readonly ICryptoService cryptoService;
    private readonly ICurrentContext currentContext;
    private readonly ITokenManagerService tokenManagerService;
    private readonly IAssetApiService assetApiService;
    private readonly IAssetService assetService;
    private readonly IFileService fileService;
    public readonly IEntityRelationService entityRelationService;
    public readonly IDeviceApiService deviceApiService;
    #endregion
    public AuthenticationService(ISiteSettingProvider siteSettingProvider,
                                 ICustomerService customerService,
                                 ILocalizer localizer,
                                 IStateManagerService stateManagerService,
                                 IPetitErrorFactory petitErrorFactory,
                                 IMessagingService messagingService,
                                 ICryptoService cryptoService,
                                 ICurrentContext currentContext,
                                 ITokenManagerService tokenManagerService,
                                 IAssetApiService assetApiService,
                                 IAssetService assetService,
                                 IFileService fileService,
                                 IEntityRelationService entityRelationService,
                                 IDeviceApiService deviceApiService)
    {
      this.siteSettingProvider = siteSettingProvider;
      this.customerService = customerService;
      this.localizer = localizer;
      this.stateManagerService = stateManagerService;
      this.petitErrorFactory = petitErrorFactory;
      this.messagingService = messagingService;
      this.cryptoService = cryptoService;
      this.currentContext = currentContext;
      this.tokenManagerService = tokenManagerService;
      this.assetApiService = assetApiService;
      this.assetService = assetService;
      this.fileService = fileService;
      this.entityRelationService = entityRelationService;
      this.deviceApiService = deviceApiService;
    }
    public static AssetResult ToAssetResult(Asset asset)
    {
      return new AssetResult
      {
        Id = asset.Id.Id,
        Name = asset.Name,
        Type = asset.Type,
        Label = asset.Label,
        ManagerId = asset.CustomerId.Id,
        OwnerId = asset.CustomerId.Id,
      };
    }
    public async Task<AuthenticationResult> Authenticate(string phone, CancellationToken cancellationToken = default)
    {
      if (!FormatService.PhoneRegEx(phone))
      {
        throw petitErrorFactory.PhoneFormatError();
      }
      phone = FormatService.PhoneInternationalization(phone);
      await SendCode(phone: phone, cancellationToken: cancellationToken);
      var claims = new List<Claim>
      {
        new Claim("phone", phone),
        new Claim("token-type",  TokenType.Verify.ToString())
      };
      var token = await tokenManagerService.GenerateToken(tokenSetting: siteSettingProvider.SiteSetting.AuthTokenSetting,
                                                          claims: claims.ToArray());
      return new AuthenticationResult()
      {
        Token = token,
        TokenType = TokenType.Verify,
        RefreshToken = null
      };
    }
    public async Task<AuthenticationResult> VerifyAuthenticate(string verificationCode,
                                                               string verificationToken,
                                                               CancellationToken cancellationToken = default)
    {
      var claimsPrincipal = await tokenManagerService.ValidateToken(token: verificationToken,
                                                                    tokenSetting: siteSettingProvider.SiteSetting.AuthTokenSetting);
      var tokenTypeValue = claimsPrincipal.FindFirstValue("token-type");
      if (tokenTypeValue != TokenType.Verify.ToString())
        throw petitErrorFactory.InvalidToken();
      var phone = claimsPrincipal.FindFirstValue("phone");
      await VerifyPhone(phone: phone,
                        code: verificationCode);
      var customer = await customerService.GetCustomerByPhone(phone: phone,
                                                              cancellationToken: cancellationToken);
      if (customer != null)
      {
        return await Login(customer: customer);
      }
      var tokenType = TokenType.Register;
      var tokenSetting = siteSettingProvider.SiteSetting.AuthTokenSetting;
      var claims = new List<Claim>
      {
        new Claim("phone", phone),
        new Claim("token-type", tokenType.ToString()),
      };
      var token = await tokenManagerService.GenerateToken(tokenSetting: tokenSetting,
                                                          claims: claims.ToArray());
      return new AuthenticationResult()
      {
        Token = token,
        RefreshToken = null,
        TokenType = tokenType
      };
    }
    public async Task<AuthenticationResult> FastLoginForDebug(string phoneNumber,
                                                               CancellationToken cancellationToken = default)
    {
      if (!FormatService.PhoneRegEx(phoneNumber))
      {
        throw petitErrorFactory.PhoneFormatError();
      }
      phoneNumber = FormatService.PhoneInternationalization(phoneNumber);
      var customer = await customerService.GetCustomerByPhone(phone: phoneNumber,
                                                              cancellationToken: cancellationToken);
      if (customer != null)
      {
        return await Login(customer: customer);
      }
      else throw petitErrorFactory.AccessDenied();
    }
    private async Task<AuthenticationResult> Login(Customer customer)
    {
      var tokenSetting = siteSettingProvider.SiteSetting.TokenSetting;
      var securityStamp = tokenManagerService.GenerateSecurityStamp(user: customer);
      var claims = new List<Claim>
      {
        new Claim("phone", customer.Phone),
        new Claim("user-id", customer.Id.Id),
        new Claim("security-stamp", securityStamp),
        new Claim("token-type", TokenType.Auth.ToString()),
      };
      await tokenManagerService.SetSecurityStamp(userId: customer.Id.Id,
                                                 securityStamp: securityStamp);
      var token = await tokenManagerService.GenerateToken(tokenSetting: tokenSetting,
                                                          claims: claims.ToArray());
      //TODO refresh token
      return new AuthenticationResult()
      {
        Token = token,
        TokenType = TokenType.Auth,
        RefreshToken = token
      };
    }
    public async Task Logout()
    {
      var hashToken = cryptoService.Hash(currentContext.GetUserToken());
      await tokenManagerService.DeactivateToken(token: hashToken,
                                                expireDate: currentContext.GetUserTokenExpiration());
    }
    public async Task<string> SendCode(string phone, CancellationToken cancellationToken = default)
    {
      var random = new Random();
      string code = random.Next(10000, 99999).ToString();
      var expireTimeSpan = TimeSpan.FromMinutes(siteSettingProvider.SiteSetting.VerificationCodeExpireMinutes);
      await stateManagerService.SetState(key: phone,
                                         value: code,
                                         timeSpan: expireTimeSpan);
      var template = localizer["fa"]["OTP-Template"].Value;
      //var message = template.Replace("{Code}", code);
      await messagingService.SendSMS(phone: phone,
                                     message: code,
                                     cancellationToken: cancellationToken);
      return code;
    }
    public async Task VerifyPhone(string phone, string code)
    {
      var verification = await stateManagerService.GetState<string>(phone);
      if (verification == null || verification != code)
      {
        throw petitErrorFactory.InValidVerificationCode();
      }
      await stateManagerService.RemoveState(phone);
    }
    public async Task<AuthenticationResult> Register(string firstName,
                                                     string lastName,
                                                     string email,
                                                     string registerToken,
                                                     CancellationToken cancellationToken = default)
    {
      var claimsPrincipal = await tokenManagerService.ValidateToken(token: registerToken,
                                                                    tokenSetting: siteSettingProvider.SiteSetting.AuthTokenSetting);
      var tokenTypeValue = claimsPrincipal.FindFirstValue("token-type");
      if (tokenTypeValue != TokenType.Register.ToString())
        throw petitErrorFactory.InvalidToken();
      var phone = claimsPrincipal.FindFirstValue("phone");
      var customer = await customerService.Register(phone: phone,
                                                    firstName: firstName,
                                                    lastName: lastName,
                                                    email: email,
                                                    cancellationToken: cancellationToken);
      var asset = new Asset()
      {
        Type = $"Home",
        Label = $"Default Home",
      };
      await assetApiService.AddAsset(asset: asset, customer: customer, cancellationToken: cancellationToken);
      return await Login(customer: customer); ;
    }
    public async Task<ProfileResult> GetUserProfile(CancellationToken cancellationToken)
    {
      var customer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);

      var imageId = string.Empty;
      customer.AdditionalInfo.TryGetValue("ProfileImageId", out imageId);
      if (customer.AdditionalInfo.ContainsKey("ProfileImageId"))
        imageId = customer.AdditionalInfo["ProfileImageId"];
      else
        customer.AdditionalInfo.Add("ProfileImageId", imageId);
      Guid? uploadedImageId = null;
      byte[] uploadedImageRowVersion = null;
      if (imageId != null)
      {
        var uploadedImage = fileService.GetFileById(Guid.Parse(imageId), cancellationToken);
        uploadedImageId = uploadedImage.Result?.Id;
        uploadedImageRowVersion = uploadedImage.Result?.RowVersion;
      }

      return new ProfileResult
      {
        Id = customer.Id.Id,
        Phone = customer.Phone,
        Email = customer.Email,
        FirstName = customer.AdditionalInfo.GetValueOrDefault("FirstName"),
        LastName = customer.AdditionalInfo.GetValueOrDefault("LastName"),
        ProfileImageId = uploadedImageId,
        ImageRowVersion = uploadedImageRowVersion
      };
    }
    public async Task<ProfileResult> EditUserProfile(string firstName, string lastName, string email, Guid? profileImageId, CancellationToken cancellationToken)
    {
      var customer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);
      if (customer.AdditionalInfo.ContainsKey("FirstName"))
        customer.AdditionalInfo["FirstName"] = firstName;
      else
        customer.AdditionalInfo.Add("FirstName", firstName);
      if (customer.AdditionalInfo.ContainsKey("LastName"))
        customer.AdditionalInfo["LastName"] = lastName;
      else
        customer.AdditionalInfo.Add("LastName", lastName);
      Guid? uploadedImageId = null;
      byte[] uploadedImageRowVersion = null;
      if (profileImageId != null)
      {
        var image = new petit.Domains.Files.File
        {
          Id = profileImageId.Value
        };
        var uploadedImage = await fileService.InsertUploadedFile(image, cancellationToken);
        if (customer.AdditionalInfo.ContainsKey("ProfileImageId"))
          customer.AdditionalInfo["ProfileImageId"] = image.Id.ToString();
        else
          customer.AdditionalInfo.Add("ProfileImageId", image.Id.ToString());
        uploadedImageId = uploadedImage.Id;
        uploadedImageRowVersion = uploadedImage.RowVersion;
      }
      var result = await customerService.SaveCustomer(customer: customer,
                                              cancellationToken: cancellationToken);
      return new ProfileResult
      {
        Id = result.Id.Id,
        Phone = result.Phone,
        Email = result.Email,
        FirstName = result.AdditionalInfo.GetValueOrDefault("FirstName"),
        LastName = result.AdditionalInfo.GetValueOrDefault("LastName"),
        ProfileImageId = uploadedImageId,
        ImageRowVersion = uploadedImageRowVersion
      };
    }

    public async Task<AuthenticationResult> EditUserProfilePhone(string phone, CancellationToken cancellationToken)
    {
      if (!FormatService.PhoneRegEx(phone))
      {
        throw petitErrorFactory.PhoneFormatError();
      }
      phone = FormatService.PhoneInternationalization(phone);
      await SendCode(phone: phone, cancellationToken: cancellationToken);
      var claims = new List<Claim>
      {
        new Claim("phone", phone),
        new Claim("token-type",  TokenType.ChangePhone.ToString())
      };
      var token = await tokenManagerService.GenerateToken(tokenSetting: siteSettingProvider.SiteSetting.AuthTokenSetting,
                                                          claims: claims.ToArray());
      return new AuthenticationResult()
      {
        Token = token,
        TokenType = TokenType.ChangePhone,
        RefreshToken = null
      };
    }

    public async Task<AuthenticationResult> VerifyUserProfilePhone(string verificationCode, string verificationToken, CancellationToken cancellationToken)
    {
      var claimsPrincipal = await tokenManagerService.ValidateToken(token: verificationToken,
                                                                    tokenSetting: siteSettingProvider.SiteSetting.AuthTokenSetting);
      var tokenTypeValue = claimsPrincipal.FindFirstValue("token-type");
      if (tokenTypeValue != TokenType.ChangePhone.ToString())
        throw petitErrorFactory.InvalidToken();
      var phone = claimsPrincipal.FindFirstValue("phone");
      await VerifyPhone(phone: phone,
                        code: verificationCode);
      var tokenType = TokenType.ChangePhone;
      var tokenSetting = siteSettingProvider.SiteSetting.AuthTokenSetting;
      var claims = new List<Claim>
      {
        new Claim("phone", phone),
        new Claim("token-type", tokenType.ToString()),
      };
      var token = await tokenManagerService.GenerateToken(tokenSetting: tokenSetting,
                                                          claims: claims.ToArray());
      var customer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);
      customer.Phone = phone;
      customer.Title = phone;
      customer.Email = phone + "@parlar.ir";
      var result = await customerService.SaveCustomer(customer: customer,
                                                      cancellationToken: cancellationToken);
      return new AuthenticationResult()
      {
        Token = token,
        RefreshToken = null,
        TokenType = tokenType
      };
    }

    public async Task DeleteCurrentUser(CancellationToken cancellationToken)
    {
      var customer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);
      if (customer == null)
        return;
      var customerRelations = await entityRelationService.FindByFrom(customer.Id.Id, EntityType.Customer, EntityRelationTypeGroup.Common, cancellationToken);
      if (customerRelations.Count == 0)
        return;
      var assetId = customerRelations.Where(x => x.To.EntityType == "ASSET").FirstOrDefault().To.Id;
      var manager = await customerService.GetCustomers(10, 0, "A:" + assetId);
      var managerIdString = "A:" + assetId + "-Manager";
      var managerId = manager.Data.Where(x => x.Title == managerIdString).FirstOrDefault().Id.Id;
      var customerDefaultAsset = await assetService.GetAssetById(assetId);
      await assetApiService.DeleteAsset(customerDefaultAsset.Id.Id);
      var assetsList = await assetService.GetCustomerAssets(managerId);
      if (assetsList != null)
      {
        var assets = assetsList.Data.Select(x => ToAssetResult(x));
        foreach (var asset in assets)
          await assetApiService.DeleteAsset(asset.Id);
      }
      await customerService.DeleteCustomer(managerId);
      await customerService.DeleteCustomer(customer.Id.Id);
      await Logout();
    }
  }
}