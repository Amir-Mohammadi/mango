using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using petit.Services;
using petit.Models.Assets;
using petit.Models.ThingsBoard;
using core.Models;
using System.Collections.Generic;
using petit.Models.Users;

namespace petit.Controllers
{
  [Route("/api/v1")]
  [ApiController]
  public class AssetApiController : BaseController
  {
    private readonly IAssetApiService assetApiService;
    #region Fields    
    #endregion
    #region Constractor
    public AssetApiController(IAssetApiService assetApiService)
    {
      this.assetApiService = assetApiService;
    }
    #endregion
    #region Assets
    /// <summary>
    /// Get all assets
    /// </summary>    
    /// <param name="cancellationToken"></param>    
    /// <returns></returns>
    [Authorize]
    [HttpGet("assets")]
    public async Task<IList<AssetResult>> GetAssets(CancellationToken cancellationToken = default)
    {
      var result = await assetApiService.GetAssetResults(cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Get asset
    /// </summary>
    /// <param name="id">Id</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpGet("assets/{id}")]
    public async Task<AssetResult> GetAsset([FromRoute] string id, CancellationToken cancellationToken = default)
    {
      var result = await assetApiService.GetAssetResult(id: id, cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Add a asset
    /// </summary>
    /// <param name="model">Add asset input model</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets")]
    public async Task<AssetResult> AddAsset([FromBody] AddAssetInput model, CancellationToken cancellationToken = default)
    {
      var asset = new Asset()
      {
        Type = model.Type,
        Label = model.Label,
      };
      asset = await assetApiService.AddAsset(asset: asset, cancellationToken: cancellationToken);
      var result = await assetApiService.GetAssetResult(id: asset.Id.Id, cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    ///  Edit asset
    /// </summary>
    /// <param name="id">AssetId</param>
    /// <param name="model">Edit asset input model</param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPut("assets/{id}")]
    public async Task<AssetResult> EditAsset([FromRoute] string id, [FromBody] EditAssetInput model, CancellationToken cancellationToken = default)
    {
      var asset = await assetApiService.GetAsset(id: id, cancellationToken: cancellationToken);
      asset.Type = model.Type;
      asset.Label = model.Label;
      asset = await assetApiService.EditAsset(asset: asset, cancellationToken: cancellationToken);
      var result = await assetApiService.GetAssetResult(id: asset.Id.Id, cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Delete Asset by id 
    /// </summary>
    /// <param name="id">AssetId</param>
    /// <param name="cancellationToken"></param>    
    /// <returns></returns>
    [Authorize]
    [HttpDelete("assets/{id}")]
    public async Task DeleteAsset(string id, CancellationToken cancellationToken = default)
    {
      await assetApiService.DeleteAsset(id: id, cancellationToken: cancellationToken);
    }
    #endregion
    /// <summary>
    /// Share asset
    /// </summary>
    /// <param name="id">AssetId</param>
    /// <param name="model"></param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets/{id}/share")]
    public async Task<ShareAssetResult> ShareAsset([FromRoute] string id, [FromBody] ShareAssetInput model, CancellationToken cancellationToken = default)
    {
      var result = await assetApiService.ShareAsset(id: id,
                                                    phone: model.Phone,
                                                    cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Verify share asset
    /// </summary>    
    /// <param name="model"></param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets/verify-share")]
    public async Task VerifyShareAsset([FromBody] VerifyShareAssetInput model, CancellationToken cancellationToken = default)
    {
      await assetApiService.VerifyShareAsset(sharingToken: model.SharingToken,
                                             cancellationToken: cancellationToken);
    }
    /// <summary>
    /// Between whom shared
    /// </summary>    
    /// <param name="assetId"></param>    
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost("assets/{assetId}/between-whom-shared")]
    public async Task<ICollection<ProfileResult>> BetweenWhomShared([FromRoute] string assetId, CancellationToken cancellationToken = default)
    {
      return await assetApiService.BetweenWhomShared(assetId: assetId,
                                                     cancellationToken: cancellationToken);
    }
  }
}