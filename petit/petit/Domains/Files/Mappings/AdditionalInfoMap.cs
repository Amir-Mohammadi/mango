using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using petit.Models.AdditionalInfos;

namespace petit.Domains.Files.Mappings
{
  public class AdditionalInfoMap : IEntityTypeConfiguration<AdditionalInfo>
  {
    public void Configure(EntityTypeBuilder<AdditionalInfo> builder)
    {
      builder.HasKey(x => x.Id);
      builder.HasRowVersion();
      builder.Property(x => x.Id).IsRequired();
      builder.Property(x => x.Key).IsRequired();
      builder.Property(x => x.Value).IsRequired();
      builder.HasOne(x => x.EntityType)
             .WithMany()
             .HasForeignKey(x => x.EntityTypeId);
      builder.HasOne(x => x.Entity)
             .WithMany()
             .HasForeignKey(x => x.EntityId);
    }
  }
}