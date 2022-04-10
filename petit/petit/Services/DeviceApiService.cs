using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using core.Autofac;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.Extensions.Configuration;
using petit.Models;
using petit.Models.Common;
using petit.Models.Devices;
using petit.Models.ThingsBoard;
using petit.Models.Users;
using petit.Services.Core;
using petit.Services.ThingsBoard;


namespace petit.Services
{
  public interface IDeviceApiService : IScopedDependency
  {
    Task<IList<DeviceResult>> GetDeviceResults(string assetId, string zone = null, CancellationToken cancellationToken = default);
    Task<DeviceResult> GetDeviceResult(string assetId, string id, CancellationToken cancellationToken = default);
    Task<Device> AddDevice(string assetId, Device device, string zone, string accessToken, CancellationToken cancellationToken = default);
    Task<Device> GetDevice(string assetId, string id, bool checkOwner = true, CancellationToken cancellationToken = default);
    Task<Device> EditDevice(string assetId, Device device, string zone, CancellationToken cancellationToken = default);
    Task<Device> ChangeDeviceOwnerWithAsset(string assetId, string deviceName, CancellationToken cancellationToken = default);
    Task DeleteDevice(string assetId, string id, CancellationToken cancellationToken = default);
    Task SendRPC(string assetId, string deviceId, object requestBody, CancellationToken cancellationToken = default);
    Task<AuthenticationResult> GetDeviceUserToken(string assetId, string deviceId, CancellationToken cancellationToken = default);
    Task<DeviceConnectionPairKeyResult> GetDeviceConnectionPairKey(string deviceName, CancellationToken cancellationToken = default);
    Task<Device> InitiateAPSoftTransfer(String deviceMac, CancellationToken cancellationToken = default);
    Task<Device> FinalizeAPSoftTransfer(string assetId, string tempDeviceMac, string pairKey, CancellationToken cancellationToken = default);
    Task<Customer> GetDeviceOwnerFromAsset(Device device, CancellationToken cancellationToken = default);
    Task<Customer> GetAssetManager(Asset asset, CancellationToken cancellationToken = default);
    Task<ICollection<Customer>> GetAssetContains(Asset asset, CancellationToken cancellationToken = default);
    Task<Device> EditDeviceAndChangeAsset(string assetId, Device device, string zone, CancellationToken cancellationToken = default);
    Task<Device> ArchiveDevice(Device device, CancellationToken cancellationToken = default);
    String GetTemprorayDeviceNameWithTimePrefix(String deviceName);
    String GetOriginalDeviceNameFromTemporaryName(String deviceName);
    String GetArchiveDeviceName(String deviceName, string customerId);
    String RevertArchiveDeviceName(string deviceName);
    Task<Device> UnarchiveDeviceAndAssignToAsset(Device archivedDevice, Asset targetAsset, CancellationToken cancellationToken = default);
    Task<DeviceCredentials> GetDeviceCredentials(string deviceId, CancellationToken cancellationToken = default);
    Task<Device> GetDeviceByName(String deviceName, CancellationToken cancellationToken = default);
  }
  public class DeviceApiService : IDeviceApiService
  {
    #region Fields
    public readonly ICurrentContext currentContext;
    public readonly ArchivedEntitySetting archivedEntitySetting;
    public readonly IEntityRelationService entityRelationService;
    public readonly TemporaryEntitySetting temporaryEntitySetting;
    public readonly IRpcService rpcService;
    public readonly IUserService userService;
    public readonly IAssetApiService assetApiService;
    public readonly IPetitErrorFactory petitErrorFactory;
    public readonly IDeviceService deviceService;
    public readonly ICustomerService customerService;
    public readonly ITelemetryService telemetryService;
    #endregion
    public DeviceApiService(ICurrentContext currentContext,
                            IRpcService rpcService,
                            IUserService userService,
                            IAssetApiService assetApiService,
                            IPetitErrorFactory petitErrorFactory,
                            IConfiguration configuration,
                            IDeviceService deviceService,
                            ITelemetryService telemetryService,
                            ICustomerService customerService, IEntityRelationService entityRelationService)
    {
      this.currentContext = currentContext;
      this.rpcService = rpcService;
      this.userService = userService;
      this.assetApiService = assetApiService;
      this.petitErrorFactory = petitErrorFactory;
      this.deviceService = deviceService;
      this.telemetryService = telemetryService;
      this.archivedEntitySetting = configuration.GetSection(nameof(ArchivedEntitySetting)).Get<ArchivedEntitySetting>();
      this.temporaryEntitySetting = configuration.GetSection(nameof(TemporaryEntitySetting)).Get<TemporaryEntitySetting>();
      this.customerService = customerService;
      this.entityRelationService = entityRelationService;
    }
    public static DeviceResult ToDeviceResult(Device device)
    {
      return new DeviceResult
      {
        Id = device.Id.Id,
        Name = device.Name,
        Type = device.Type,
        Label = device.Label,
        ManagerId = device.CustomerId.Id,
        DeviceProfileId = device.DeviceProfileId.Id,
        DeviceData = device.DeviceData,
        Zone = device.AdditionalInfo?.GetValueOrDefault("Zone"),
        AssetId = device.AdditionalInfo?.GetValueOrDefault("AssetId")
      };
    }
    public async Task<IList<DeviceResult>> GetDeviceResults(string assetId,
                                                            string zone = null,
                                                            CancellationToken cancellationToken = default)
    {
      var customerId = currentContext.GetCurrentUserId();
      var asset = await assetApiService.GetAsset(id: assetId,
                                                 checkOwner: false,
                                                 checkAccess: true,
                                                 cancellationToken: cancellationToken);
      var devices = await deviceService.GetCustomerDevices(customerId: asset.CustomerId.Id,
                                                           page: 0,
                                                           pageSize: 15000,
                                                           cancellationToken: cancellationToken);
      var result = devices.Data.Select(x => ToDeviceResult(x));
      if (!string.IsNullOrEmpty(zone))
        result = result.Where(x => x.Zone == zone);

      result = result.Where(x => !x.Name.StartsWith(temporaryEntitySetting.Prefix));
      result = result.Where(x => !x.Name.StartsWith(archivedEntitySetting.Prefix));

      return result.ToList();
    }
    public async Task<DeviceResult> GetDeviceResult(string assetId, string id, CancellationToken cancellationToken = default)
    {
      var device = await GetDevice(assetId: assetId, id: id, checkOwner: false, cancellationToken: cancellationToken);
      var result = ToDeviceResult(device);
      return result;
    }
    public async Task<Device> GetDevice(string assetId, string id, bool checkOwner = true, CancellationToken cancellationToken = default)
    {
      var asset = await assetApiService.GetAsset(id: assetId,
                                                 checkOwner: checkOwner,
                                                 checkAccess: true,
                                                 cancellationToken: cancellationToken);
      var device = await deviceService.GetDeviceById(deviceId: id, cancellationToken: cancellationToken);
      if (device == null)
        return null;
      string deviceAssetId = null;
      if (device.AdditionalInfo != null)
        deviceAssetId = device.AdditionalInfo?.GetValueOrDefault("AssetId");
      if (asset.Id.Id != deviceAssetId)
        throw petitErrorFactory.AssetMismatch();
      return device;
    }
    public async Task<Device> AddDevice(string assetId, Device device, string zone, string accessToken, CancellationToken cancellationToken = default)
    {
      var asset = await assetApiService.GetAsset(id: assetId,
                                                 checkOwner: true,
                                                 checkAccess: true,
                                                 cancellationToken: cancellationToken);
      device.AdditionalInfo = new Dictionary<string, string>
      {
        { "AssetId", assetId } ,
        { "Zone", zone} ,
      };
      device = await deviceService.SaveDevice(device: device, accessToken: accessToken, cancellationToken: cancellationToken);
      device = await deviceService.AssignDeviceToCustomer(deviceId: device.Id.Id,
                                                          customerId: asset.CustomerId.Id,
                                                          cancellationToken: cancellationToken);
      return device;
    }
    public async Task<Device> EditDevice(string assetId, Device device, string zone, CancellationToken cancellationToken = default)
    {
      var asset = await assetApiService.GetAsset(id: assetId,
                                                 checkOwner: true,
                                                 checkAccess: true,
                                                 cancellationToken: cancellationToken);
      if (device.AdditionalInfo == null)
        device.AdditionalInfo = new Dictionary<string, string> { { "AssetId", asset.Id.Id } };

      if (device.AdditionalInfo.ContainsKey("Zone"))
        device.AdditionalInfo["Zone"] = zone;
      else
        device.AdditionalInfo.Add("Zone", zone);

      device = await deviceService.SaveDevice(device: device, accessToken: null, cancellationToken: cancellationToken);
      return device;
    }

    public async Task<Device> ChangeDeviceOwnerWithAsset(string assetId, string deviceName, CancellationToken cancellationToken = default)
    {
      #region Get Asset
      var asset = await assetApiService.GetAsset(id: assetId,
                                           checkOwner: true,
                                           checkAccess: true,
                                           cancellationToken: cancellationToken);

      if (asset == null)
        throw petitErrorFactory.AssetMismatch();
      #endregion

      #region  Get Device
      var device = await deviceService.GetTenantDevice(deviceName: deviceName, cancellationToken: cancellationToken);
      if (device == null)
        throw petitErrorFactory.InvalidDeviceProvideError();
      #endregion



      #region Edit Device
      var additionalInfo = new Dictionary<string, string> { { "AssetId", asset.Id.Id } };

      var zoneValue = string.Empty;

      device.AdditionalInfo.TryGetValue("Zone", out zoneValue);

      if (!string.IsNullOrEmpty(zoneValue))
        additionalInfo.Add("Zone", zoneValue);

      device.AdditionalInfo = additionalInfo;
      device.CustomerId.Id = asset.CustomerId.Id;
      device = await deviceService.SaveDevice(device: device, accessToken: null, cancellationToken: cancellationToken);
      #endregion

      return device;
    }
    public async Task DeleteDevice(string assetId, string id, CancellationToken cancellationToken = default)
    {
      await GetDevice(assetId: assetId,
                      id: id,
                      checkOwner: true,
                      cancellationToken: cancellationToken);
      await deviceService.DeleteDevice(deviceId: id, cancellationToken: cancellationToken);
    }
    public async Task SendRPC(string assetId, string deviceId, object requestBody, CancellationToken cancellationToken = default)
    {
      var device = await GetDevice(assetId: assetId,
                                   id: deviceId,
                                   checkOwner: false,
                                   cancellationToken: cancellationToken);
      var userToken = await GetDeviceUserToken(assetId: assetId,
                                               deviceId: deviceId,
                                               cancellationToken: cancellationToken);
      var result = await rpcService.HandleOneWayDeviceRPCRequest(deviceId: device.Id.Id,
                                                                 requestBody: requestBody,
                                                                 userToken: userToken,
                                                                 cancellationToken: cancellationToken);
    }
    public async Task<AuthenticationResult> GetDeviceUserToken(string assetId, string deviceId, CancellationToken cancellationToken)
    {
      var assetResult = await assetApiService.GetAssetResult(id: assetId,
                                                             cancellationToken: cancellationToken);
      var user = await userService.GetCustomerAssetUser(assetId: assetId,
                                                        managerId: assetResult.ManagerId,
                                                        cancellationToken: cancellationToken);
      var token = await userService.GetUserToken(userId: user.Id.Id,
                                                 cancellationToken: cancellationToken);
      return token;
    }

    public async Task<DeviceConnectionPairKeyResult> GetDeviceConnectionPairKey(string deviceName, CancellationToken cancellationToken)
    {

      #region  Get Device By Name
      var device = await deviceService.GetTenantDevice(deviceName: deviceName, cancellationToken: cancellationToken);
      if (device == null)
        throw petitErrorFactory.InvalidDeviceProvideError();
      #endregion

      #region  Get Device Attributes
      var keys = new List<string>(){
        DeviceAttributeKeys.PairKey
      };

      var attributes = await telemetryService.GetAttributes(entityType: EntityTypes.Device, entityId: device.Id.Id, keys: string.Join(',', keys));
      #endregion

      #region  Result
      return new DeviceConnectionPairKeyResult
      {
        Name = deviceName,
        PairKey = defineDeviceConnectionPairKey(attributes: attributes)
      };
      #endregion
    }

    public string defineDeviceConnectionPairKey(DeviceAttribute[] attributes)
    {

      var pairKey = attributes.FirstOrDefault(x => x.Key.Equals(DeviceAttributeKeys.PairKey));

      if (pairKey != null)
        return pairKey.Value;

      return string.Empty;
    }
    public async Task<Device> InitiateAPSoftTransfer(String deviceMac, CancellationToken cancellationToken = default)
    {
      var device = await GetDeviceByName(deviceMac);
      var cloneDeviceName = GetTemprorayDeviceNameWithTimePrefix(device.Name);

      return await CloneDevice(device: device, cloneDeviceName: cloneDeviceName, cancellationToken: cancellationToken);
    }

    public async Task<Device> FinalizeAPSoftTransfer(string assetId, string tempDeviceId, string pairKey, CancellationToken cancellationToken)
    {
      var currentCustomer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);

      // check the ownership of the target asset
      var asset = await assetApiService.GetAsset(id: assetId,
                                                checkOwner: true,
                                                checkAccess: true,
                                                cancellationToken: cancellationToken);

      var tempDevice = await deviceService.GetDeviceById(deviceId: tempDeviceId, cancellationToken: cancellationToken);
      var tempDeviceCredentials = await deviceService.GetDeviceCredentialsByDeviceId(deviceId: tempDevice.Id.Id, cancellationToken: cancellationToken);

      var originalDeviceId = tempDevice.AdditionalInfo.GetValueOrDefault("OriginalDeviceId");
      if (originalDeviceId == null)
      {
        throw petitErrorFactory.InvalidDeviceProvideError();
      }

      var originalDevice = await deviceService.GetDeviceById(deviceId: originalDeviceId, cancellationToken: cancellationToken);
      var originalDeviceOwner = await GetDeviceOwnerFromAsset(device: originalDevice);

      // delete the temp device
      await deviceService.DeleteDevice(tempDevice.Id.Id);


      if (originalDeviceOwner != null && String.Equals(originalDeviceOwner.Id.Id, currentCustomer.Id.Id))
      {
        // reconfiguring device (by the same owner)
        return await ReconfigureDeviceAsync(device: originalDevice,
                                            targetAsset: asset,
                                            newDeviceCredentials: tempDeviceCredentials,
                                            cancellationToken: cancellationToken);
      }
      else
      {
        // transfering the owner to new customer
        var nameOfTheNewUserArchivedDevice = GetArchiveDeviceName(originalDevice.Name, currentCustomer.Id.Id);

        // check if the new owner has the same device or not
        var q = await deviceService.GetCustomerDevices(customerId: currentCustomer.Id.Id,
                                                       page: 0,
                                                       pageSize: 1,
                                                       textSearch: nameOfTheNewUserArchivedDevice,
                                                       cancellationToken: cancellationToken);

        Device newUserPreviouslyArchivedDevice = null;
        if (q != null) newUserPreviouslyArchivedDevice = q.Data.Where(x => x.Name.Equals(nameOfTheNewUserArchivedDevice)).FirstOrDefault();

        if (newUserPreviouslyArchivedDevice != null)
        {
          // change the access token [done]
          var deviceCredential = await deviceService.GetDeviceCredentialsByDeviceId(deviceId: newUserPreviouslyArchivedDevice.Id.Id);
          deviceCredential.CredentialsType = tempDeviceCredentials.CredentialsType;
          deviceCredential.CredentialsValue = tempDeviceCredentials.CredentialsValue;
          deviceCredential.CredentialsId = tempDeviceCredentials.CredentialsId;
          await deviceService.SaveDeviceCredentials(deviceCredentials: deviceCredential);


          // archive the old owner device
          // TODO what about the time that device transfer fails? its will stay as a archive
          var archivedDevice = await ArchiveDevice(device: originalDevice, cancellationToken: cancellationToken);

          // unarchive the customer's old device and add to asset
          var device = await UnarchiveDeviceAndAssignToAsset(archivedDevice: newUserPreviouslyArchivedDevice, targetAsset: asset, cancellationToken: cancellationToken);
          return device;
        }
        else
        {
          // archive the old owner device
          // TODO what about the time that device transfer fails? its will stay as a archive
          await ArchiveDevice(device: originalDevice, cancellationToken: cancellationToken);

          // create a new device for customer [done]
          var newDevice = tempDevice;
          newDevice.Name = GetOriginalDeviceNameFromTemporaryName(tempDevice.Name);
          newDevice.Id = null;
          var device = await AddDevice(assetId: asset.Id.Id,
                                       device: newDevice,
                                       zone: null,
                                       accessToken: tempDeviceCredentials.CredentialsId,
                                       cancellationToken);
          return device;
        }
      }
    }

    public async Task<Device> ReconfigureDeviceAsync(DeviceCredentials newDeviceCredentials,
                                                      Asset targetAsset,
                                                      Device device,
                                                      CancellationToken cancellationToken)
    {
      // technically changing the credential and asset, other information should stay the same
      // change the access token of the original device
      var deviceCredential = await deviceService.GetDeviceCredentialsByDeviceId(deviceId: device.Id.Id);
      deviceCredential.CredentialsType = newDeviceCredentials.CredentialsType;
      deviceCredential.CredentialsValue = newDeviceCredentials.CredentialsValue;
      deviceCredential.CredentialsId = newDeviceCredentials.CredentialsId;
      await deviceService.SaveDeviceCredentials(deviceCredentials: deviceCredential);

      // customer may want to change the asset by reconfiguring the device        
      return await EditDeviceAndChangeAsset(assetId: targetAsset.Id.Id,
                                            device: device,
                                            zone: device.AdditionalInfo.GetValueOrDefault("Zone"),
                                            cancellationToken: cancellationToken);
    }


    public async Task<Customer> GetDeviceOwnerFromAsset(Device device, CancellationToken cancellationToken = default)
    {
      var asset = await GetAssetFromDevice(device);

      if (asset == null) return null;

      return await GetAssetManager(asset: asset, cancellationToken: cancellationToken);
    }

    public async Task<Customer> GetAssetManager(Asset asset, CancellationToken cancellationToken = default)
    {
      var assetRelations = await entityRelationService.FindByTo(toId: asset.Id.Id,
                                                                toType: EntityType.Asset,
                                                                relationTypeGroup: EntityRelationTypeGroup.Common,
                                                                cancellationToken: cancellationToken);
      var assetManager = assetRelations.Where(x => x.Type == "Manages").FirstOrDefault();

      if (assetManager == null)
        throw petitErrorFactory.FatalError($"there is no relaition to asset manager inside this asset \nassetId = {asset.Id.Id}");

      return await customerService.GetCustomerById(assetManager.From.Id);
    }

    public async Task<ICollection<Customer>> GetAssetContains(Asset asset, CancellationToken cancellationToken = default)
    {
      var assetRelations = await entityRelationService.FindByTo(toId: asset.Id.Id,
                                                                toType: EntityType.Asset,
                                                                relationTypeGroup: EntityRelationTypeGroup.Common,
                                                                cancellationToken: cancellationToken);
      var assetContains = assetRelations.Where(x => x.Type == "Contains");
      ICollection<Customer> customers = new List<Customer>();
      foreach (var contain in assetContains)
        customers.Add(await customerService.GetCustomerById(contain.To.Id));
      return customers;
    }

    public async Task<Device> EditDeviceAndChangeAsset(string assetId, Device device, string zone, CancellationToken cancellationToken = default)
    {
      var asset = await assetApiService.GetAsset(id: assetId,
                                                 checkOwner: true,
                                                 checkAccess: true,
                                                 cancellationToken: cancellationToken);

      device.AdditionalInfo = new Dictionary<string, string> { { "AssetId", asset.Id.Id } };

      if (device.AdditionalInfo.ContainsKey("Zone"))
        device.AdditionalInfo["Zone"] = zone;
      else
        device.AdditionalInfo.Add("Zone", zone);

      device.CustomerId.Id = asset.CustomerId.Id;
      return await deviceService.SaveDevice(device: device, accessToken: null, cancellationToken: cancellationToken);
    }

    public async Task<Device> ArchiveDevice(Device device, CancellationToken cancellationToken = default)
    {
      var asset = await GetAssetFromDevice(device: device, cancellationToken: cancellationToken);
      var currentCustomer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);
      var deviceOwner = await GetDeviceOwnerFromAsset(device: device, cancellationToken: cancellationToken);

      device.Name = GetArchiveDeviceName(device.Name, deviceOwner.Id.Id);

      device = await deviceService.SaveDevice(device: device, accessToken: null, cancellationToken: cancellationToken);
      return await deviceService.AssignDeviceToCustomer(deviceId: device.Id.Id,
                                                          customerId: deviceOwner.Id.Id, // directly assign to customer
                                                          cancellationToken: cancellationToken);
    }

    public String GetTemprorayDeviceNameWithTimePrefix(String deviceName)
    {
      // {prefix}-{device name}-{time stamp}
      return temporaryEntitySetting.Prefix
        + temporaryEntitySetting.Spectator
        + deviceName
        + temporaryEntitySetting.Spectator
        + new DateTimeOffset(DateTime.UtcNow).ToUnixTimeMilliseconds();
    }

    public String GetOriginalDeviceNameFromTemporaryName(String deviceName)
    {
      // {prefix}-{device name}-{time stamp}
      return deviceName.Split(temporaryEntitySetting.Spectator)[1];
    }

    public String GetArchiveDeviceName(String deviceName, string customerId)
    {
      // {prefix}-{device name}-{customer id}
      return archivedEntitySetting.Prefix
        + archivedEntitySetting.Spectator
        + deviceName
        + archivedEntitySetting.Spectator
        + customerId;
    }

    public String RevertArchiveDeviceName(string deviceName)
    {
      // {prefix}-{device name}-{customer id}
      return deviceName.Split(archivedEntitySetting.Spectator)[1];
    }

    public async Task<Device> UnarchiveDeviceAndAssignToAsset(Device archivedDevice, Asset targetAsset, CancellationToken cancellationToken = default)
    {
      var device = archivedDevice;
      device.Name = RevertArchiveDeviceName(archivedDevice.Name);
      device = await EditDeviceAndChangeAsset(assetId: targetAsset.Id.Id, device: device, zone: null, cancellationToken: cancellationToken);
      return device;
    }

    public async Task<Device> GetDeviceByName(String deviceName, CancellationToken cancellationToken = default)
    {
      var device = await deviceService.GetTenantDevice(deviceName: deviceName, cancellationToken: cancellationToken);
      if (device == null)
        throw petitErrorFactory.InvalidDeviceProvideError();

      return device;
    }

    public async Task<Asset> GetAssetFromDevice(Device device, CancellationToken cancellationToken = default)
    {
      var assetId = string.Empty;

      device.AdditionalInfo.TryGetValue("AssetId", out assetId);
      if (assetId == null)
        return null;

      var asset = await assetApiService.GetAsset(id: assetId,
                                                 checkOwner: false,
                                                 checkAccess: false,
                                                 cancellationToken: cancellationToken);

      return asset;
    }

    public async Task<Device> CloneDevice(Device device, string cloneDeviceName, CancellationToken cancellationToken = default)
    {
      var currentCustomer = await customerService.GetCurrentCustomer(cancellationToken: cancellationToken);

      device.Name = cloneDeviceName;
      device.AdditionalInfo.Add("OriginalDeviceId", device.Id.Id);
      device.Id = null;

      device = await deviceService.SaveDevice(device: device, accessToken: null, cancellationToken: cancellationToken);
      device = await deviceService.AssignDeviceToCustomer(deviceId: device.Id.Id,
                                                          customerId: currentCustomer.Id.Id, // directly assign to customer
                                                          cancellationToken: cancellationToken);
      return device;
    }

    public Task<DeviceCredentials> GetDeviceCredentials(string deviceId, CancellationToken cancellationToken = default)
    {
      return deviceService.GetDeviceCredentialsByDeviceId(deviceId: deviceId);
    }

  }
}