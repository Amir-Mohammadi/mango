using core.Autofac;
using Microsoft.Extensions.Localization;
namespace petit.Services.Core.Localizer
{
  public interface ILocalizer : ISingletonDependency
  {
    IStringLocalizer this[string culture] { get; }
  }
}