using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using core.Data;
using petit.Models.AdditionalInfos;

namespace petit.Services
{
  public interface IAdditionalInfoManager
  {
    Task AddAdditionalInfo(int EntityTypeId, int EntityId, AdditionalInfo additionalInfo, CancellationToken cancellationToken = default);
    Task<ICollection<AdditionalInfo>> GetAdditionalInfos(int EntityTypeId, int EntityId, CancellationToken cancellationToken = default);
    Task EditAdditionalInfo(int EntityTypeId, int EntityId, AdditionalInfo additionalInfo, CancellationToken cancellationToken = default);
  }
  public class AdditionalInfoManager : IAdditionalInfoManager
  {
    private readonly IRepository<AdditionalInfo> additionalInfoRepository;
    public AdditionalInfoManager(IRepository<AdditionalInfo> additionalInfoRepository)
    {
      this.additionalInfoRepository = additionalInfoRepository;
    }
    private static AdditionalInfoResult ToAdditionalInfoResult(AdditionalInfo additionalInfo)
    {
      return new AdditionalInfoResult
      {
        Id = additionalInfo.Id,
        Key = additionalInfo.Key,
        Value = additionalInfo.Value,
        EntityTypeId = additionalInfo.EntityTypeId,
        EntityId = additionalInfo.EntityId
      };
    }
    public async Task AddAdditionalInfo(int entityTypeId, int entityId, AdditionalInfo additionalInfo, CancellationToken cancellationToken = default)
    {
      await additionalInfoRepository.AddAsync(additionalInfo, cancellationToken);
    }

    public async Task EditAdditionalInfo(int entityTypeId, int entityId, AdditionalInfo additionalInfo, CancellationToken cancellationToken = default)
    {
      await additionalInfoRepository.UpdateAsync(additionalInfo, cancellationToken);
    }

    public async Task<ICollection<AdditionalInfo>> GetAdditionalInfos(int entityTypeId, int entityId, CancellationToken cancellationToken = default)
    {
      var getAll = await additionalInfoRepository.GetAllAsync();
      var result = getAll.Where(x => x.EntityTypeId == entityTypeId && x.EntityId == entityId).ToList();
      return result;
    }
  }
}