namespace petit.Models.ThingsBoard
{
  public partial class ComponentDescriptor
  {
    public ComponentDescriptorScope? Scope { get; set; }
    public ComponentDescriptorType? Type { get; set; }
    public string Actions { get; set; }
    public string Clazz { get; set; }
    public string ConfigurationDescriptor { get; set; }
    public long? CreatedTime { get; set; }
    public ComponentDescriptorId Id { get; set; }
    public string Name { get; set; }
  }
}