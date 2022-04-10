namespace petit.Models.ThingsBoard
{
  public partial class AuditLog
  {
    public AuditActionStatus? ActionStatus { get; set; }
    public AuditActionType? ActionType { get; set; }
    public string ActionData { get; set; }
    public string ActionFailureDetails { get; set; }
    public long? CreatedTime { get; set; }
    public CustomerId CustomerId { get; set; }
    public EntityId EntityId { get; set; }
    public string EntityName { get; set; }
    public AuditLogId Id { get; set; }
    public TenantId TenantId { get; set; }
    public UserId UserId { get; set; }
    public string UserName { get; set; }
  }
}