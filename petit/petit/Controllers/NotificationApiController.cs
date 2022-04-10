using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using petit.Models.Notifications;
using petit.Models.ThingsBoard;
using petit.Services.ThinsBoard;

namespace petit.Controllers
{
  [Route("/api/v1")]
  [ApiController]
  public class NotificationApiController : BaseController
  {
    #region Fields
    private readonly INotificationApiService notificationService;
    #endregion

    #region Constractor
    public NotificationApiController(INotificationApiService notificationService)
    {
      this.notificationService = notificationService;
    }
    #endregion

    #region Notification
    /// <summary>
    /// Get notifications
    /// </summary>
    /// <param name="dateTime">dateTime</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("notifications")]
    [Authorize]
    public async Task<ICollection<Notification>> GetNotifications([FromRoute] string dateTime, CancellationToken cancellationToken = default)
    {
      var result = await notificationService.GetNotifications(dateTime: dateTime,
                                                              cancellationToken: cancellationToken);
      return result;
    }

    /// <summary>
    /// Read notifications
    /// </summary>
    /// <param name="notificationId">notificationId</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("notifications/{id}/read")]
    [Authorize]
    public async Task<Notification> ReadNotification(string notificationId, CancellationToken cancellationToken)
    {
      var result = await notificationService.ReadNotification(notificationId: notificationId,
                                                              cancellationToken: cancellationToken);
      return result;
    }

    /// <summary>
    /// Read notifications
    /// </summary>
    /// <param name="model">model</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("notifications/read-all")]
    [Authorize]
    public async Task ReadNotifications(Notification model, CancellationToken cancellationToken)
    {
      await notificationService.ReadNotifications(model: model, cancellationToken: cancellationToken);
    }

    /// <summary>
    /// Check versioninfo
    /// </summary>
    /// <param name="versionNumber">versionNumber</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("app-versions/{versionNumber}/check-valid")]
    [Authorize]
    public async Task<VersionInfo> CheckValideVersion(string versionNumber, CancellationToken cancellationToken)
    {
      var result = await notificationService.CheckValideVersion(versionNumber: versionNumber,
                                                                cancellationToken: cancellationToken);
      return result;
    }

    /// <summary>
    /// Get termsOfService
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet("terms-of-service")]
    [Authorize]
    public async Task<TermsOfService> GetTermsOfService(CancellationToken cancellationToken)
    {
      var result = await notificationService.GetTermsOfService(cancellationToken: cancellationToken);
      return result;
    }

    /// <summary>
    /// Get termsOfService
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("terms-of-service/accept")]
    [Authorize]
    public async Task<TermsOfService> AcceptTermsOfService(CancellationToken cancellationToken)
    {
      var result = await notificationService.AcceptTermsOfService(cancellationToken: cancellationToken);
      return result;
    }
    #endregion
  }
}