using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using core.Models;
using Microsoft.AspNetCore.Http;
using petit.Models.AdditionalInfos;

namespace petit.Models.ThingsBoard
{
  public partial class Customer : IUser
  {
    public Dictionary<string, string> AdditionalInfo { get; set; }
    public string Address { get; set; }
    public string Address2 { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public long? CreatedTime { get; set; }
    [DataType(DataType.EmailAddress)]
    [RegularExpression(@"^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$", ErrorMessage = "Input format for email is not valid")]
    [StringLength(500, ErrorMessage = "Maximum email length is 500 characters")]
    public string Email { get; set; }
    public CustomerId Id { get; set; }
    public string Name { get; set; }
    [DataType(DataType.PhoneNumber)]
    [RegularExpression(@"^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$", ErrorMessage = "Input format for phone is not valid")]
    public string Phone { get; set; }
    public string State { get; set; }
    public TenantId TenantId { get; set; }
    public string Title { get; set; }
    public string Zip { get; set; }
    public string GetSecurityStamp()
    {
      return $"{Id.Id}-{Phone}-{Title}";
    }
  }
}