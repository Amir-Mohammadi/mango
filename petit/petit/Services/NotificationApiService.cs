using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using core.Autofac;
using petit.Models.Notifications;
using petit.Models.ThingsBoard;
using petit.Services.Core;
using petit.Services.ThingsBoard;

namespace petit.Services.ThinsBoard
{
  public interface INotificationApiService : IScopedDependency
  {
    Task<TermsOfService> AcceptTermsOfService(CancellationToken cancellationToken);
    Task<VersionInfo> CheckValideVersion(string versionNumber, CancellationToken cancellationToken);
    Task<ICollection<Notification>> GetNotifications(string dateTime, CancellationToken cancellationToken);
    Task<TermsOfService> GetTermsOfService(CancellationToken cancellationToken);
    Task<Notification> ReadNotification(string notificationId, CancellationToken cancellationToken);
    Task ReadNotifications(Notification model, CancellationToken cancellationToken);
  }
  public class NotificationApiService : INotificationApiService
  {
    #region Fields
    private readonly ICurrentContext currentContext;
    private readonly ICustomerService customerService;
    private readonly INotificationService notificationService;
    #endregion
    #region Constractor
    public NotificationApiService(ICurrentContext currentContext,
                                  ICustomerService customerService,
                                  INotificationService notificationService)
    {
      this.currentContext = currentContext;
      this.customerService = customerService;
      this.notificationService = notificationService;
    }
    #endregion

    public async Task<TermsOfService> AcceptTermsOfService(CancellationToken cancellationToken)
    {
      var customerId = currentContext.GetCurrentUserId();
      return await notificationService.AcceptTermsOfService(customerId, cancellationToken);
    }

    public async Task<VersionInfo> CheckValideVersion(string versionNumber, CancellationToken cancellationToken)
    {
      var customerId = currentContext.GetCurrentUserId();
      return await notificationService.CheckValideVersion(customerId, versionNumber, cancellationToken);
    }

    public async Task<ICollection<Notification>> GetNotifications(string dateTime, CancellationToken cancellationToken)
    {
      var customerId = currentContext.GetCurrentUserId();
      return await notificationService.GetNotifications(customerId, dateTime, cancellationToken);
    }

    public async Task<TermsOfService> GetTermsOfService(CancellationToken cancellationToken)
    {
      var customerId = currentContext.GetCurrentUserId();
      return await notificationService.GetTermsOfService(customerId, cancellationToken);
    }

    public async Task<Notification> ReadNotification(string notificationId, CancellationToken cancellationToken)
    {
      var customerId = currentContext.GetCurrentUserId();
      return await notificationService.ReadNotification(customerId, notificationId, cancellationToken);
    }

    public async Task ReadNotifications(Notification model, CancellationToken cancellationToken)
    {
      var customerId = currentContext.GetCurrentUserId();
      await notificationService.ReadNotifications(customerId, model, cancellationToken);
    }
  }
}