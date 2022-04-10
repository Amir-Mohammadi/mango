using System.Collections.Generic;
using Microsoft.Extensions.Localization;
using core.Autofac;
using System.Linq;
namespace petit.Services.Core.Localizer
{
  public class JsonStringLocalizer : IStringLocalizer
  {
    private readonly Dictionary<string, string> localizations = new();
    public JsonStringLocalizer(Dictionary<string, string> localizations)
    {
      this.localizations = localizations;
    }
    public LocalizedString this[string name]
    {
      get
      {
        var value = GetString(name);
        return new LocalizedString(name, value ?? name, resourceNotFound: value == null);
      }
    }
    public LocalizedString this[string name, params object[] arguments]
    {
      get
      {
        var format = GetString(name);
        var value = string.Format(format ?? name, arguments);
        return new LocalizedString(name, value, resourceNotFound: format == null);
      }
    }
    public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
    {
      return localizations.Select(l => new LocalizedString(l.Key, l.Value, true));
    }
    private string GetString(string name)
    {
      var value = localizations[name];
      return value;
    }
  }
}