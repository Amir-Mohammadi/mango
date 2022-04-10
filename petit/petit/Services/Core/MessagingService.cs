using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using petit.Models.Common;
using core.Messaging;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Web;
namespace petit.Services.Core
{
    public class MessagingService : IMessagingService
    {
        private readonly HttpClient client;
        private readonly SMSServiceSetting smsServiceSetting;
        public MessagingService(IConfiguration configuration)
        {
            this.client = new HttpClient();
            smsServiceSetting = configuration.GetSection(nameof(SMSServiceSetting)).Get<SMSServiceSetting>();
        }
        public async Task SendSMS(string phone, string message, CancellationToken cancellationToken = default)
        {
            //TODO  uncomment in production
            string url = smsServiceSetting.LookUpUrl;
            url = url.Replace("{ApiKey}", smsServiceSetting.ApiKey);
            url = url.Replace("{Phone}", phone);
            url = url.Replace("{VerifyCode}", HttpUtility.UrlEncode(message));
            await client.GetAsync(url, cancellationToken: cancellationToken);
            System.Console.WriteLine($"**** send SMS=> {phone}:{message}");
        }
    }
}