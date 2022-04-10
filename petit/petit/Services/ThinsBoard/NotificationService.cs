using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using core.Autofac;
using core.Data;
using core.Models;
using core.StateManager;
using petit.Models.Notifications;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;

namespace petit.Services.ThinsBoard
{
  public interface INotificationService : IScopedDependency
  {
    Task<TermsOfService> AcceptTermsOfService(string customerId, CancellationToken cancellationToken);
    Task<VersionInfo> CheckValideVersion(string customerId, string versionNumber, CancellationToken cancellationToken);
    Task<ICollection<Notification>> GetNotifications(string customerId, string dateTime, CancellationToken cancellationToken);
    Task<TermsOfService> GetTermsOfService(string customerId, CancellationToken cancellationToken);
    Task<Notification> ReadNotification(string customerId, string notificationId, CancellationToken cancellationToken);
    Task ReadNotifications(string customerId, Notification model, CancellationToken cancellationToken);
  }
  public class NotificationService : INotificationService
  {
    public static readonly int itemsPerPage = 10;
    private readonly IRestClientService restClientService;
    private readonly IStateManagerService stateManagerService;
    private readonly IRepository<Notification> notificationRepository;
    private readonly IRepository<VersionInfo> versionInfoRepository;
    private readonly IRepository<TermsOfService> termsOfServiceRepository;
    public NotificationService(IRestClientService restClientService,
                               IStateManagerService stateManagerService,
                               IRepository<Notification> notificationRepository,
                               IRepository<VersionInfo> versionInfoRepository,
                               IRepository<TermsOfService> termsOfServiceRepository)
    {
      this.restClientService = restClientService;
      this.stateManagerService = stateManagerService;
      this.notificationRepository = notificationRepository;
      this.versionInfoRepository = versionInfoRepository;
      this.termsOfServiceRepository = termsOfServiceRepository;
    }

    public async Task<TermsOfService> AcceptTermsOfService(string customerId,
                                                           CancellationToken cancellationToken)
    {
      var terms = termsOfServiceRepository.GetAllAsync().Result.LastOrDefault();
      terms.IsAcceptedByMe = true;
      await termsOfServiceRepository.UpdateAsync(terms, cancellationToken);
      return terms;
    }

    public async Task<VersionInfo> CheckValideVersion(string customerId,
                                                      string versionNumber,
                                                      CancellationToken cancellationToken)
    {
      var vi = await versionInfoRepository.GetAllAsync();
      var result = vi.Where(x => x.VersionNumber == versionNumber).FirstOrDefault();
      return result;
    }

    public async Task<ICollection<Notification>> GetNotifications(string customerId,
                                                                  string dateTime,
                                                                  CancellationToken cancellationToken)
    {
      var queryParams = new Dictionary<string, string>();
      var allNotifs = await notificationRepository.GetAllAsync();
      var result = allNotifs.Where(x => x.ReadDate <= DateTime.Parse(dateTime) || x.ReadDate == null).ToList();
      return result;
    }

    public async Task<TermsOfService> GetTermsOfService(string customerId,
                                                        CancellationToken cancellationToken)
    {
      var terms = await termsOfServiceRepository.GetAllAsync();
      var result = terms.Where(x => x.IsAcceptedByMe == false).FirstOrDefault();
      return result;
    }

    public async Task<Notification> ReadNotification(string customerId,
                                                     string notificationId,
                                                     CancellationToken cancellationToken)
    {
      var read = await notificationRepository.GetAsync(notificationId);
      read.ReadDate = DateTime.Now;
      await notificationRepository.UpdateAsync(read, cancellationToken);
      return read;
    }

    public async Task ReadNotifications(string customerId,
                                        Notification model,
                                        CancellationToken cancellationToken)
    {
      var targetCustomerIds = model.TargetCustomerIds;
      foreach (var targetId in targetCustomerIds)
      {
        var id = (int)targetId;
        var read = notificationRepository.GetAsync(id).Result;
        read.ReadDate = DateTime.Now;
        await notificationRepository.UpdateAsync(read, cancellationToken);
      }
    }
  }
}