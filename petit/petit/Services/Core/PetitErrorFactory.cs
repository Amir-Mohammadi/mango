using System;
using base_core.Common;
using core.Autofac;
using core.ExceptionHandler;
using petit.Common;

namespace petit.Services.Core
{
  public interface IPetitErrorFactory : IErrorFactory, IScopedDependency
  {
    Exception ThingsBoardApiException(string message);
    Exception CustomerMismatch();
    Exception AssetAlreadyShared();
    Exception AssetMismatch();
    Exception InvalidDeviceProvideError();
    Exception FatalError(string message = null);
    Exception RpcTimeout();
  }
  public class PetitErrorFactory : IPetitErrorFactory
  {
    private IExceptionFactory<AppException> factory;
    public PetitErrorFactory(IExceptionFactory<AppException> factory)
    {
      this.factory = factory;
    }
    public virtual Exception AccessDenied() { return factory.Unauthorized().UseCode(ErrorCodes.ACCESS_DENIED).AsException(); }
    public virtual Exception InvalidToken() { return factory.Failed().UseCode(ErrorCodes.INVALID_TOKEN).AsException(); }
    public virtual Exception ThisUserIsAltered() { return factory.Failed().UseCode(ErrorCodes.THIS_USER_IS_ALTERED).AsException(); }
    public virtual Exception FileNotFound() { return factory.NotFound().UseCode(ErrorCodes.FILE_NOT_FOUND).AsException(); }
    public virtual Exception InValidVerificationCode() { return factory.Failed().UseCode(ErrorCodes.INVALID_VERIFICATION_CODE).AsException(); }
    public virtual Exception XssDetect() { return factory.Failed().UseCode(ErrorCodes.XSS_DETECT).AsException(); }
    public virtual Exception ApiProtectorAttackDetect() { return factory.Failed().UseCode(ErrorCodes.API_PROTECTOR_DETECT).AsException(); }
    public virtual Exception ResourceNotFound(string message = null) { return factory.NotFound().UseCode(ErrorCodes.RESOURCE_NOT_FOUND).UseInfo(message).AsException(); }
    public virtual Exception ResourceNotFound(object id, string name = null, string message = null)
    {
      var info = new
      {
        Id = id,
        Name = name,
        Message = message
      };
      return factory.NotFound().UseCode(ErrorCodes.RESOURCE_NOT_FOUND).UseInfo(info).AsException();
    }
    public virtual Exception PhoneFormatError() { return factory.Failed().UseCode(ErrorCodes.PHONE_FORMAT_ERROR).AsException(); }
    public virtual Exception EmailFormatError() { return factory.Failed().UseCode(ErrorCodes.EMAIL_FORMAT_ERROR).AsException(); }
    public virtual Exception ThingsBoardApiException(string message) { return factory.NotFound().UseCode(ErrorCodes.RESOURCE_NOT_FOUND).UseInfo(message).AsException(); }
    public virtual Exception CustomerMismatch() { return factory.Failed().UseCode(PetitErrorCodes.CUSTOMER_MISMATCH).AsException(); }
    public virtual Exception AssetAlreadyShared() { return factory.Failed().UseCode(PetitErrorCodes.ASSET_ALREADY_SHEARD).AsException(); }
    public virtual Exception AssetMismatch() { return factory.Failed().UseCode(PetitErrorCodes.ASSET_MISMATCH).AsException(); }
    public virtual Exception InvalidDeviceProvideError() { return factory.Failed().UseCode(PetitErrorCodes.INVALID_DEVICE_PROVIDE_ERROR).AsException(); }
    public virtual Exception FatalError(string message = null) { return factory.Failed().UseCode(PetitErrorCodes.FATAL_ERROR).UseInfo(message).AsException(); }
    public virtual Exception RpcTimeout() { return factory.Failed().UseCode(PetitErrorCodes.DEVICE_UNREACHABLE).AsException(); }
  }
}