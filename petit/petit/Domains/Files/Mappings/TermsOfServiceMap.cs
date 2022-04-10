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
  public class TermsOfServiceMap : IEntityTypeConfiguration<TermsOfService>
  {
    public void Configure(EntityTypeBuilder<TermsOfService> builder)
    {
      builder.HasKey(x => x.Id);
      builder.HasRowVersion();
      builder.Property(x => x.Id).IsRequired();
      builder.Property(x => x.Body).IsRequired();
      builder.Property(x => x.IsAcceptedByMe).IsRequired();
      builder.Property(x => x.UpdatedDate).IsRequired(false);
      builder.Property(x => x.DeletedDate).IsRequired(false);
      builder.Property(x => x.CreatedDate).IsRequired(false);
    }
  }
}