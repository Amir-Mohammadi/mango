using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using petit.Domains.Files;
using petit.Services;
namespace petit.Controllers
{
  [Route("/api/v1")]
  [ApiController]
  public class FileApiController : BaseController
  {
    #region Fields
    private readonly IFileService fileService;
    #endregion
    #region Constractor
    public FileApiController(IFileService fileService)
    {
      this.fileService = fileService;
    }
    #endregion
    #region File  
    /// <summary>
    /// Upload file to memory
    /// </summary>
    /// <param name="files">file</param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("files/upload")]
    [Authorize]
    public async Task<IList<Guid>> UploadFileToSession(List<IFormFile> files, CancellationToken cancellationToken = default)
    {
      var result = new List<Guid>();
      long size = files.Sum(f => f.Length);
      foreach (var formFile in files)
      {
        if (formFile.Length > 0)
        {
          var fileInput = new core.Models.UploadedFile(formFile);
          var fileId = await fileService.UploadToMemory(fileInput, cancellationToken);
          result.Add(fileId);
        }
      }
      return result;
    }
    /// <summary>
    /// save uploaded file to database
    /// </summary>
    /// <param name="imageId">Uploaded file id </param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPost("files/store")]
    [Authorize]
    public async Task StoreImage(Guid imageId, CancellationToken cancellationToken = default)
    {
      var image = new File
      {
        Id = imageId
      };
      await fileService.InsertUploadedFile(file: image,
                                   cancellationToken: cancellationToken);
    }
    #endregion
  }
}