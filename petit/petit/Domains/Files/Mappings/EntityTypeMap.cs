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
  public class EntityTypeMap : IEntityTypeConfiguration<EntityType>
  {
    public void Configure(EntityTypeBuilder<EntityType> builder)
    {
      builder.HasKey(x => x.Id);
      builder.HasRowVersion();
      builder.Property(x => x.Id).IsRequired();
      builder.Property(x => x.EntityName).IsRequired();
    }
  }
}