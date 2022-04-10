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
  public class CustomersNotificationsMap : IEntityTypeConfiguration<CustomersNotifications>
  {
    public void Configure(EntityTypeBuilder<CustomersNotifications> builder)
    {
      builder.HasKey(x => x.Id);
      builder.HasRowVersion();
      builder.Property(x => x.Id).IsRequired();
      builder.Property(x => x.ReadDate);
      builder.Property(x => x.CustomerId).IsRequired();
      builder.HasOne(x => x.Notification)
             .WithMany()
             .HasForeignKey(x => x.NotificationId);
    }
  }
}