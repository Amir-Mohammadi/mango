using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using petit.Models.Users;
using petit.Services;
namespace petit.Controllers
{
  [Route("/api/v1")]
  [ApiController]
  public class UserApiController : BaseController
  {
    #region Fields    
    private readonly IAuthenticationService authenticationService;
    #endregion
    #region Constractor
    public UserApiController(IAuthenticationService authenticationService)
    {
      this.authenticationService = authenticationService;
    }
    #endregion
    #region Authentication   
    /// <summary>
    /// Start authenticate get verify-token and send OTP via sms 
    /// </summary>
    /// <param name="model"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public async Task<AuthenticationResult> Authenticate([FromBody] AuthenticationInput model, CancellationToken cancellationToken = default)
    {
      return await authenticationService.Authenticate(phone: model.Phone,
                                                      cancellationToken: cancellationToken);
    }
    /// <summary>
    /// Verify OTP 
    /// if the customer has already registered then the auth-token will be returned
    /// if the customer has not registered before then the register-token will be returned and you must complate register with users/register
    /// </summary>
    /// <param name="model"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("users/verify-authenticate")]
    [AllowAnonymous]
    public async Task<AuthenticationResult> VerifyAuthenticate([FromBody] VerifyAuthenticateInput model, CancellationToken cancellationToken = default)
    {
      return await authenticationService.VerifyAuthenticate(verificationCode: model.VerificationCode,
                                                            verificationToken: model.VerificationToken,
                                                            cancellationToken: cancellationToken);
    }
    /// <summary>
    /// generate token for a phone number without authenticate 
    /// </summary>
    /// <param name="phoneNumber"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("debug/login/{phoneNumber}")]
    [AllowAnonymous]
    public async Task<AuthenticationResult> DebugFastLogin([FromRoute] string phoneNumber, CancellationToken cancellationToken = default)
    {
      return await authenticationService.FastLoginForDebug(phoneNumber: phoneNumber,
                                                            cancellationToken: cancellationToken);
    }
    /// <summary>
    /// Register  
    /// you must first receive a OTP with users/authenticate  and then receive register-token with  users/verify-authenticate and then complete your registration
    /// </summary>
    /// <param name="model"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [AllowAnonymous()]
    [HttpPost("users/register")]
    public async Task<AuthenticationResult> Register([FromBody] RegisterInput model, CancellationToken cancellationToken = default)
    {
      var result = await authenticationService.Register(firstName: model.FirstName,
                                                        lastName: model.LastName,
                                                        email: model.Email,
                                                        registerToken: model.RegisterToken,
                                                        cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Logout 
    /// </summary>
    /// <returns></returns>
    [HttpPost("users/me/logout")]
    [Authorize]
    public async Task<ActionResult> Logout()
    {
      await authenticationService.Logout();
      return Ok();
    }
    /// <summary>
    /// Get current user profile
    /// </summary>
    /// <returns></returns>
    [HttpGet("users/me/profile")]
    [Authorize]
    public async Task<ProfileResult> GetProfileResult(CancellationToken cancellationToken = default)
    {
      var result = await authenticationService.GetUserProfile(cancellationToken: cancellationToken);
      return result;
    }
    /// <summary>
    /// Edit profile
    /// </summary>
    /// <returns></returns>
    [HttpPut("users/me/profile")]
    [Authorize]
    public async Task<ProfileResult> EditProfile(EditProfileInput model, CancellationToken cancellationToken = default)
    {
      return await authenticationService.EditUserProfile(firstName: model.FirstName,
                                                         lastName: model.LastName,
                                                         email: model.Email,
                                                         profileImageId: model.ProfileImageId,
                                                         cancellationToken: cancellationToken);
    }
    /// <summary>
    /// Edit profile phone
    /// </summary>
    /// <param name="model"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPut("users/me/change-phone")]
    [Authorize]
    public async Task<AuthenticationResult> EditProfilePhone(EditProfilePhoneInput model, CancellationToken cancellationToken = default)
    {
      return await authenticationService.EditUserProfilePhone(phone: model.Phone,
                                                              cancellationToken: cancellationToken);
    }
    /// <summary>
    /// Verify user profile phone
    /// </summary>
    /// <param name="model"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("users/me/change-phone-verify")]
    [Authorize]
    public async Task<AuthenticationResult> VerifyUserProfilePhone([FromBody] VerifyAuthenticateInput model, CancellationToken cancellationToken = default)
    {
      return await authenticationService.VerifyUserProfilePhone(verificationCode: model.VerificationCode,
                                                                verificationToken: model.VerificationToken,
                                                                cancellationToken: cancellationToken);
    }
    /// <summary>
    /// Delete profile
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpDelete("users/me")]
    [Authorize]
    public async Task DeleteCurrentUser(CancellationToken cancellationToken = default)
    {
      await authenticationService.DeleteCurrentUser(cancellationToken: cancellationToken);
    }
    #endregion
  }
}