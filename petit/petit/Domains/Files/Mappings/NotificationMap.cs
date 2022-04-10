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
  public class NotificationMap : IEntityTypeConfiguration<Notification>
  {
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
      builder.HasKey(x => x.Id);
      builder.HasRowVersion();
      builder.Property(x => x.Id).IsRequired();
      builder.Property(x => x.Version).IsRequired();
      builder.Property(x => x.IsImportant).IsRequired();
      builder.Property(x => x.IsBroadcast).IsRequired();
      builder.Property(x => x.Title).IsRequired();
      builder.Property(x => x.Body).IsRequired();
      builder.Property(x => x.TargetCustomerIds).IsRequired(false);
      builder.Property(x => x.NotificationType).IsRequired();
      builder.Property(x => x.ReadDate).IsRequired(false);
      builder.Property(x => x.UpdatedDate).IsRequired(false);
      builder.Property(x => x.DeletedDate).IsRequired(false);
      builder.Property(x => x.CreatedDate).IsRequired(false);
    }
  }
}