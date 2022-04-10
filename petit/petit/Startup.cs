using System.Text.Json.Serialization;
using Autofac;
using core.Autofac;
using core.Extensions;
using core.PaginationInfo;
using core.Setting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using petit.Common;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace petit
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }
    public IConfiguration Configuration { get; }
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.ConfigureSiteSetting(configuration: Configuration);
      services.AddDistributedMemoryCache();
      services.AddHttpContextAccessor();
      services.AddMvcCore().AddDataAnnotations();
      services.AddContext(configuration: Configuration);
      services.AddCors(configuration: Configuration);
      services.AddControllers(config =>
      {
        config.Filters.Add(new PaginationInfoFilter());
      });
      services.AddRedisService(configuration: Configuration);
      services.AddJwtAuthentication(configuration: Configuration);
      services.AddBrotliAndGzipResponseCompression();
      services.AddCustomApiVersioning(majorVersion: 1, minorVersion: 0);
      services.AddSwaggerGen(apiVersion: "v1");
      services.AddSwaggerGenNewtonsoftSupport();
    }
    public void ConfigureContainer(ContainerBuilder builder)
    {
      builder.AddAutofacDependencyServices();
    }
    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app,
                          IWebHostEnvironment env,
                          ISiteSettingProvider siteSettingProvider)
    {
      app.UseResponseCompression();
      //if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
          c.SwaggerEndpoint("/swagger/v1/swagger.json", "petit v1");
          c.DocExpansion(DocExpansion.None);
        });
      }
      app.UseHttpStatusCode();
      app.UseCustomExceptionHandler(Options.Create(new PetitErrorCodes()));
      // if (env.IsProduction())
      //   app.UseHttpsRedirection();
      app.UseRouting();
      app.UseRequestLogger();
      app.UseApiProtector();
      app.UseCors(siteSettingProvider.SiteSetting.AllowSpecificOrigins);
      app.UseFileHandler();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseTransactionsPerRequest();
      app.UseStatistics();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
