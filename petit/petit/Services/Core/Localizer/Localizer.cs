using System.Collections.Generic;
using core.Autofac;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Localization;
namespace petit.Services.Core.Localizer
{
  public class Localizer : ILocalizer
  {
    private readonly Dictionary<string, IStringLocalizer> localizations = new();
    public Localizer()
    {
      foreach (var file in Directory.GetFiles(@"Resources/"))
      {
        var localization = JsonConvert.DeserializeObject<Dictionary<string, string>>(File.ReadAllText(file));
        var culture = Path.GetFileNameWithoutExtension(file);
        var stringLocalizer = new JsonStringLocalizer(localization);
        localizations.Add(culture, stringLocalizer);
      }
    }
    public IStringLocalizer this[string culture]
    {
      get
      {
        return localizations[culture];
      }
    }
  }
}