using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using petit.Models.Devices;
using petit.Models.ThingsBoard;
using petit.Models.Users;
using petit.Services;
namespace petit.Controllers
{
  [Route("/api/v1")]
  [ApiController]
  public class DeviceApiController : BaseController
  {
    private readonly IDeviceApiService deviceApiService;
    #region Fields    
    #endregion
    #region Constractor
    public DeviceApiController(IDeviceApiService deviceApiService)
    {
      this.deviceApiService = deviceApiService;
    }
    #endregion
    #region Devices
    /// <summary>
    /// Get all devices
    /// </summary>
    /// <param name="assetId">AssetId</param>    
    /// <param name="zone"></param>
    /// <param name="cancellationToken"></param>    
    /// <returns></returns>
    [Authorize]
    [HttpGet("assets/{assetId}/devices")]
    public async Task<IList<DeviceResult>> GetDevices([FromRoute] string assetId,
                                                                [FromQuery] string zone,
                                                                CancellationToken cancellationToken = default)
    {
      var result = await deviceApiService.GetDeviceResults(assetId: assetId,
                                                           zone: zone,
                                                           cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Get device
    /// </summary>
    /// <param name="assetId">AssetId</param>
    /// <param name="id">DeviceId</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpGet("assets/{assetId}/devices/{id}")]
    public async Task<DeviceResult> GetDevice([FromRoute] string assetId,
                                              [FromRoute] string id,
                                              CancellationToken cancellationToken = default)
    {
      var result = await deviceApiService.GetDeviceResult(assetId: assetId, id: id, cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Get device
    /// </summary>
    /// <param name="assetId">AssetId</param>
    /// <param name="id">DeviceId</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpGet("assets/{assetId}/devices/{id}/user-token")]
    public async Task<AuthenticationResult> GetDeviceUserToken([FromRoute] string assetId,
                                                 [FromRoute] string id,
                                                 CancellationToken cancellationToken = default)
    {
      var result = await deviceApiService.GetDeviceUserToken(assetId: assetId,
                                                             deviceId: id,
                                                             cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Add a device
    /// </summary>
    /// <param name="assetId">AssetId </param>
    /// <param name="model">Add device input model</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets/{assetId}/devices")]
    public async Task<DeviceResult> AddDevice([FromRoute] string assetId,
                                              [FromBody] AddDeviceInput model,
                                              CancellationToken cancellationToken = default)
    {
      var device = new Device()
      {
        Name = model.DeviceIdentifier,
        Type = model.Type,
        Label = model.Label,
        DeviceProfileId = new DeviceProfileId() { Id = model.DeviceProfileId },
      };
      device = await deviceApiService.AddDevice(assetId: assetId,
                                                device: device,
                                                zone: model.Zone,
                                                accessToken: model.AccessToken,
                                                cancellationToken: cancellationToken);
      var result = await deviceApiService.GetDeviceResult(assetId: assetId,
                                                          id: device.Id.Id,
                                                          cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    ///  Edit device
    /// </summary>
    /// <param name="assetId">AssetId</param>
    /// <param name="id">DeviceId</param>
    /// <param name="model">Edit device input model</param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPut("assets/{assetId}/devices/{id}")]
    public async Task<DeviceResult> EditDevice([FromRoute] string assetId, [FromRoute] string id, [FromBody] EditDeviceInput model, CancellationToken cancellationToken = default)
    {
      var device = await deviceApiService.GetDevice(assetId: assetId,
                                                    id: id,
                                                    checkOwner: true,
                                                    cancellationToken: cancellationToken);
      device.Name = model.DeviceIdentifier;
      device.Type = model.Type;
      device.Label = model.Label;
      device.DeviceProfileId = new DeviceProfileId() { Id = model.DeviceProfileId };
      device = await deviceApiService.EditDevice(assetId: assetId,
                                                 device: device,
                                                 zone: model.Zone,
                                                 cancellationToken: cancellationToken);
      var result = await deviceApiService.GetDeviceResult(assetId: assetId,
                                                          id: device.Id.Id,
                                                          cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    ///  change device owner
    /// </summary>
    /// <param name="assetId">AssetId</param>
    /// <param name="deviceName">DeviceName</param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets/{assetId}/devices/{deviceName}/change-owner")]
    public async Task<DeviceResult> ChangeDeviceOwner([FromRoute] string assetId, [FromRoute] string deviceName, CancellationToken cancellationToken = default)
    {
      var device = await deviceApiService.ChangeDeviceOwnerWithAsset(assetId: assetId,
                                                    deviceName: deviceName,
                                                    cancellationToken: cancellationToken);
      var result = await deviceApiService.GetDeviceResult(assetId: assetId,
                                                          id: device.Id.Id,
                                                          cancellationToken: cancellationToken);
      return result;
    }

    /// <summary>
    ///  initiating a device transfer in ap soft mode
    /// </summary>
    /// <param name="deviceMac">DeviceMac Address</param>
    /// <param name="cancellationToken"></param>
    /// <returns>
    /// will return a temporary device to start the comunication and confirm the pair key
    /// </returns>
    [Authorize]
    [HttpPost("devices/{deviceMac}/ap-soft/initiate-transfer")]
    public async Task<Device> InitiateAPSoftTransfer([FromRoute] string deviceMac, CancellationToken cancellationToken = default)
    {
      return await deviceApiService.InitiateAPSoftTransfer(deviceMac: deviceMac, cancellationToken: cancellationToken);
    }

    /// <summary>
    /// finalize device transfer in ap soft mode
    /// </summary>
    /// <param name="assetId">the asset that device will be a member of</param>
    /// <param name="tempDeviceId">Temporary Device Id</param>
    /// <param name="pairKey">transfer pair key</param>
    /// <param name="cancellationToken"></param>
    [Authorize]
    [HttpPost("assets/{assetId}/device/{tempDeviceId}/ap-soft/finalize-transfer/{pairKey}")]
    public async Task<Device> FinalizeAPSoftTransfer([FromRoute] string assetId, string tempDeviceId, string pairKey, CancellationToken cancellationToken = default)
    {
      return await deviceApiService.FinalizeAPSoftTransfer(assetId: assetId,
                                                           tempDeviceMac: tempDeviceId,
                                                           pairKey: pairKey,
                                                           cancellationToken: cancellationToken);
    }


    /// <summary>
    ///  get device connection status
    /// </summary>
    /// <param name="deviceName">DeviceName</param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpGet("devices/{deviceName}/connection-pairKey")]
    public async Task<DeviceConnectionPairKeyResult> GetDeviceConnectionPairKey([FromRoute] string deviceName, CancellationToken cancellationToken = default)
    {
      var deviceConnectionStatus = await deviceApiService.GetDeviceConnectionPairKey(deviceName: deviceName, cancellationToken: cancellationToken);

      return deviceConnectionStatus;
    }

    /// <summary>
    /// Delete Device by id 
    /// </summary>
    /// <param name="assetId">AssetId </param>
    /// <param name="id">DeviceId</param>
    /// <param name="cancellationToken"></param>    
    /// <returns></returns>
    [Authorize]
    [HttpDelete("assets/{assetId}/devices/{id}")]
    public async Task DeleteDevice([FromRoute] string assetId, [FromRoute] string id, CancellationToken cancellationToken = default)
    {
      await deviceApiService.DeleteDevice(assetId: assetId, id: id, cancellationToken: cancellationToken);
    }

    /// <summary>
    /// Send RPC command to device
    /// </summary>
    /// <param name="assetId">AssetId </param>
    /// <param name="id">DeviceId</param>
    /// <param name="body">rpc data</param>
    /// <param name="cancellationToken"></param>    
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets/{assetId}/devices/{id}/rpc")]
    public async Task SendRPC([FromRoute] string assetId, [FromRoute] string id, [FromBody] object body, CancellationToken cancellationToken = default)
    {
      var requestBody = JsonConvert.DeserializeObject(body.ToString());
      await deviceApiService.SendRPC(assetId: assetId,
                                     deviceId: id,
                                     requestBody: requestBody,
                                     cancellationToken: cancellationToken);
    }

    /// <summary>
    /// get the credential of a device, witout any access controll
    /// TODO: delete this as soon as possible
    /// </summary>
    /// <param name="deviceMac"></param>
    /// <param name="cancellationToken"></param>    
    /// <returns></returns>
    [Authorize]
    [HttpPost("devices/{deviceMac}/credential")]
    public async Task<DeviceCredentials> GetDeviceCredentialByMac([FromRoute] string deviceMac, CancellationToken cancellationToken = default)
    {
      var device = await deviceApiService.GetDeviceByName(deviceName: deviceMac);
      return await deviceApiService.GetDeviceCredentials(deviceId: device.Id.Id);
    }
    #endregion
  }
}