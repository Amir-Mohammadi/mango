using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using petit.Domains.Files;
using core.Data;
using core.StateManager;
using Microsoft.EntityFrameworkCore;
using core.Autofac;
namespace petit.Services
{
  public interface IFileService : IScopedDependency, core.FileHandler.IFileService
  {
    Task<File> InsertUploadedFile(File file, CancellationToken cancellationToken = default);
    Task<File> InsertFile(File file, CancellationToken cancellationToken = default);
    Task UpdateFile(File file, CancellationToken cancellationToken = default);
    Task<File> GetFileById(Guid id, CancellationToken cancellationToken, bool loadStream = false);
    IQueryable<File> GetFiles(string tag, CancellationToken cancellationToken = default);
    Task DeleteMyFile(File file, CancellationToken cancellationToken = default);
    Task DeleteFile(File file, CancellationToken cancellationToken = default);
    Task<Guid> UploadToMemory(core.Models.UploadedFile uploadedFile, CancellationToken cancellationToken = default);
  }
  public class FileService : IFileService
  {
    #region Fields
    private readonly IStateManagerService stateManagerService;
    private readonly IRepository<File> fileRepository;
    #endregion
    #region Constractor        
    public FileService(IStateManagerService stateManagerService,
                       IRepository<File> fileRepository)
    {
      this.stateManagerService = stateManagerService;
      this.fileRepository = fileRepository;
    }
    #endregion
    #region File
    public async Task DeleteMyFile(File file, CancellationToken cancellationToken = default)
    {
      await fileRepository.DeleteAsync(predicate: x => x.Id == file.Id, cancellationToken);
    }
    public async Task DeleteFile(File file, CancellationToken cancellationToken = default)
    {
      await fileRepository.DeleteAsync(predicate: x => x.Id == file.Id, cancellationToken);
    }
    public async Task<File> GetFileById(Guid id, CancellationToken cancellationToken, bool loadStream = false)
    {
      var query = fileRepository.GetQuery().Where(predicate: x => x.Id == id).Select(x => new File()
      {
        Id = x.Id,
        FileName = x.FileName,
        FileType = x.FileType,
        RowVersion = x.RowVersion,
        FileStream = loadStream ? x.FileStream : null
      });
      return await query.FirstOrDefaultAsync(cancellationToken);
    }
    public IQueryable<File> GetFiles(string tag, CancellationToken cancellationToken = default)
    {
      var query = fileRepository.GetQuery();
      var result = query.Select(x => new File()
      {
        Id = x.Id,
        FileName = x.FileName,
        FileType = x.FileType,
        RowVersion = x.RowVersion,
        FileStream = null
      });
      return result;
    }
    public async Task<core.Models.IFile> GetFileResultWithStreamById(Guid id, byte[] rowVersion, CancellationToken cancellationToken = default)
    {
      var result = await fileRepository.GetQuery()
                                       .Where(x => x.Id == id && x.RowVersion == rowVersion)
                                       .FirstOrDefaultAsync(cancellationToken);
      return result;
    }
    public async Task<File> InsertUploadedFile(File file, CancellationToken cancellationToken = default)
    {
      var uploadedFile = await this.stateManagerService.GetState<core.Models.UploadedFile>("fk" + file.Id.ToString());
      file.FileStream = uploadedFile.Stream;
      file.FileName = uploadedFile.FileName;
      file.FileType = System.IO.Path.GetExtension(uploadedFile.FileName);
      return await InsertFile(file: file, cancellationToken: cancellationToken);
    }
    public async Task<File> InsertFile(File file, CancellationToken cancellationToken = default)
    {
      await fileRepository.AddAsync(file, cancellationToken);
      return file;
    }
    public async Task UpdateFile(File file, CancellationToken cancellationToken = default)
    {
      await fileRepository.UpdateAsync(file, cancellationToken);
    }
    public async Task<Guid> UploadToMemory(core.Models.UploadedFile uploadedFile, CancellationToken cancellationToken = default)
    {
      var fileId = Guid.NewGuid();
      await this.stateManagerService.SetState("fk" + fileId.ToString(), uploadedFile);
      return fileId;
    }
    #endregion
  }
}