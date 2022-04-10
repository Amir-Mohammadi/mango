using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using petit.Models.ThingsBoard;

namespace petit.Domains.Files.Mappings
{
  public class VersionInfoMap : IEntityTypeConfiguration<VersionInfo>
  {
    public void Configure(EntityTypeBuilder<VersionInfo> builder)
    {
      builder.HasKey(x => x.Id);
      builder.HasRowVersion();
      builder.Property(x => x.Id).IsRequired();
      builder.Property(x => x.VersionName).IsRequired();
      builder.Property(x => x.VersionNumber).IsRequired();
      builder.Property(x => x.DiscontinuedMessage).IsRequired();
      builder.Property(x => x.UpdatedTime).IsRequired();
      builder.Property(x => x.DiscontinuedDate).IsRequired(false);
      builder.Property(x => x.CreatedDate).IsRequired();
    }
  }
}