using System;
using System.Linq;
using System.Reflection;
using base_core.Common;
using Nancy.ViewEngines.SuperSimpleViewEngine;

/* 
* Important Note
* since there is another error code here in base core project
* we allways use the 2xxx code for the custom ones
*/
namespace petit.Common
{
  public class PetitErrorCodes : ErrorCodes, IErrorCodes
  {
    public new string ResolveName(int errorCode)
    {
      var errorCodeType = typeof(PetitErrorCodes);

      FieldInfo[] fieldInfos = { };
      while (errorCodeType != null)
      {
        fieldInfos = fieldInfos.Concat(errorCodeType.GetFields()).ToArray();
        errorCodeType = errorCodeType.BaseType;
      }

      var dictionary = fieldInfos.Select(x => new { Name = x.Name, Value = x.GetValue(x.Name).ToString() });
      return dictionary.FirstOrDefault(x => x.Value == errorCode.ToString()).Name;
    }
    public const int FATAL_ERROR = 2000;
    public const int INVALID_DEVICE_PROVIDE_ERROR = 2001;
    public const int CUSTOMER_MISMATCH = 2003;
    public const int ASSET_ALREADY_SHEARD = 2004;
    public const int ASSET_MISMATCH = 2005;
    public const int DEVICE_UNREACHABLE = 2006;
  }
}