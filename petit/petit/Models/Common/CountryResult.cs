namespace petit.Models.Common
{
  public class CountryResult
  {
    /// <summary>
    /// CountryId
    /// </summary>
    /// <value></value>
    public int Id { get; set; }
    /// <summary>
    /// CountryCode for example +90
    /// </summary>
    /// <value></value>
    public string Code { get; set; }
    /// <summary>
    /// CountryName for example Turkey
    /// </summary>
    /// <value></value>
    public string Name { get; set; }
    /// <summary>
    /// RowVersion
    /// </summary>
    /// <value></value>
    public byte[] RowVersion { get; set; }
    /// <summary>
    /// Culture for localizer
    /// </summary>
    /// <value></value>
    public string Culture { get; set; }
  }
}