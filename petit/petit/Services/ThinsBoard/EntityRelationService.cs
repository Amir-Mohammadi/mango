using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using petit.Models.ThingsBoard;
using petit.Services.RestClients;
using core.Autofac;
namespace petit.Services.ThingsBoard
{
  public interface IEntityRelationService : IScopedDependency
  {
    Task DeleteRelation(string fromId, string fromType, string relationType, string toId, string toType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task DeleteRelations(string entityId, string entityType, string id, string type = null, CancellationToken cancellationToken = default);
    Task<List<EntityRelation>> FindByFrom(string fromId, string fromType, string relationType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task<List<EntityRelation>> FindByFrom(string fromId, string fromType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task<List<EntityRelation>> FindByQuery(EntityRelationsQuery query, CancellationToken cancellationToken = default);
    Task<List<EntityRelation>> FindByTo(string toId, string toType, string relationType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task<List<EntityRelation>> FindByTo(string toId, string toType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task<List<EntityRelationInfo>> FindInfoByFrom(string fromId, string fromType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task<List<EntityRelationInfo>> FindInfoByQuery(EntityRelationsQuery query, CancellationToken cancellationToken = default);
    Task<List<EntityRelationInfo>> FindInfoByTo(string toId, string toType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task<EntityRelation> GetRelation(string fromId, string fromType, string relationType, string toId, string toType, string relationTypeGroup, CancellationToken cancellationToken = default);
    Task SaveRelation(EntityRelation relation, CancellationToken cancellationToken = default);
  }
  public class EntityRelationService : IEntityRelationService
  {
    public EntityRelationService(IRestClientService restClientService)
    {
      this.restClientService = restClientService;
    }
    private readonly IRestClientService restClientService;
    public async Task DeleteRelation(string fromId,
                                     string fromType,
                                     string relationType,
                                     string toId,
                                     string toType,
                                     string relationTypeGroup,
                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/relation";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (fromId != null)
        queryParams.Add("fromId", Convert.ToString(fromId));
      if (fromType != null)
        queryParams.Add("fromType", Convert.ToString(fromType));
      if (relationType != null)
        queryParams.Add("relationType", Convert.ToString(relationType));
      if (toId != null)
        queryParams.Add("toId", Convert.ToString(toId));
      if (toType != null)
        queryParams.Add("toType", Convert.ToString(toType));
      await restClientService.DeleteAsync(path: path,
                                          queryParams: queryParams,
                                          cancellationToken: cancellationToken);
    }
    public async Task DeleteRelations(string entityId,
                                      string entityType,
                                      string id,
                                      string type = null,
                                      CancellationToken cancellationToken = default)
    {
      var path = "/api/relations";
      var queryParams = new Dictionary<string, string>();
      if (entityId != null)
        queryParams.Add("entityId", Convert.ToString(entityId));
      if (entityType != null)
        queryParams.Add("entityType", Convert.ToString(entityType));
      if (id != null)
        queryParams.Add("id", Convert.ToString(id));
      if (type != null)
        queryParams.Add("type", Convert.ToString(type));
      await restClientService.DeleteAsync(path: path, queryParams: queryParams, cancellationToken: cancellationToken);
    }
    public async Task<List<EntityRelation>> FindByFrom(string fromId,
                                                       string fromType,
                                                       string relationType,
                                                       string relationTypeGroup,
                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/relations";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (fromId != null)
        queryParams.Add("fromId", Convert.ToString(fromId));
      if (fromType != null)
        queryParams.Add("fromType", Convert.ToString(fromType));
      if (relationType != null)
        queryParams.Add("relationType", Convert.ToString(relationType));
      var result = await restClientService.GetAsync<List<EntityRelation>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelation>> FindByFrom(string fromId,
                                                       string fromType,
                                                       string relationTypeGroup,
                                                       CancellationToken cancellationToken = default)
    {
      var path = "/api/relations";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (fromId != null)
        queryParams.Add("fromId", Convert.ToString(fromId));
      if (fromType != null)
        queryParams.Add("fromType", Convert.ToString(fromType));
      var result = await restClientService.GetAsync<List<EntityRelation>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelation>> FindByQuery(EntityRelationsQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/relations";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<List<EntityRelation>>(path: path,
                                                                           body: body,
                                                                           cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelation>> FindByTo(string toId,
                                                     string toType,
                                                     string relationType,
                                                     string relationTypeGroup,
                                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/relations";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (toId != null)
        queryParams.Add("toId", Convert.ToString(toId));
      if (toType != null)
        queryParams.Add("toType", Convert.ToString(toType));
      if (relationType != null)
        queryParams.Add("relationType", Convert.ToString(relationType));
      var result = await restClientService.GetAsync<List<EntityRelation>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelation>> FindByTo(string toId,
                                                     string toType,
                                                     string relationTypeGroup,
                                                     CancellationToken cancellationToken = default)
    {
      var path = "/api/relations";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (toId != null)
        queryParams.Add("toId", Convert.ToString(toId));
      if (toType != null)
        queryParams.Add("toType", Convert.ToString(toType));
      var result = await restClientService.GetAsync<List<EntityRelation>>(path: path,
                                                                          queryParams: queryParams,
                                                                          cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelationInfo>> FindInfoByFrom(string fromId,
                                                               string fromType,
                                                               string relationTypeGroup,
                                                               CancellationToken cancellationToken = default)
    {
      var path = "/api/relations/info";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (fromId != null)
        queryParams.Add("fromId", Convert.ToString(fromId));
      if (fromType != null)
        queryParams.Add("fromType", Convert.ToString(fromType));
      var result = await restClientService.GetAsync<List<EntityRelationInfo>>(path: path,
                                                                              queryParams: queryParams,
                                                                              cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelationInfo>> FindInfoByQuery(EntityRelationsQuery query, CancellationToken cancellationToken = default)
    {
      var path = "/api/relations/info";
      var body = restClientService.SerializeObject(query);
      var result = await restClientService.PostAsync<List<EntityRelationInfo>>(path: path,
                                                                               body: body,
                                                                               cancellationToken: cancellationToken);
      return result;
    }
    public async Task<List<EntityRelationInfo>> FindInfoByTo(string toId,
                                                             string toType,
                                                             string relationTypeGroup,
                                                             CancellationToken cancellationToken = default)
    {
      var path = "/api/relations/info";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (toId != null)
        queryParams.Add("toId", Convert.ToString(toId));
      if (toType != null)
        queryParams.Add("toType", Convert.ToString(toType));
      var result = await restClientService.GetAsync<List<EntityRelationInfo>>(path: path,
                                                                              queryParams: queryParams,
                                                                              cancellationToken: cancellationToken);
      return result;
    }
    public async Task<EntityRelation> GetRelation(string fromId,
                                                  string fromType,
                                                  string relationType,
                                                  string toId,
                                                  string toType,
                                                  string relationTypeGroup,
                                                  CancellationToken cancellationToken = default)
    {
      var path = "/api/relation";
      var queryParams = new Dictionary<string, string>();
      if (relationTypeGroup != null)
        queryParams.Add("relationTypeGroup", Convert.ToString(relationTypeGroup));
      if (fromId != null)
        queryParams.Add("fromId", Convert.ToString(fromId));
      if (fromType != null)
        queryParams.Add("fromType", Convert.ToString(fromType));
      if (relationType != null)
        queryParams.Add("relationType", Convert.ToString(relationType));
      if (toId != null)
        queryParams.Add("toId", Convert.ToString(toId));
      if (toType != null)
        queryParams.Add("toType", Convert.ToString(toType));
      var result = await restClientService.GetAsync<EntityRelation>(path: path,
                                                                    queryParams: queryParams,
                                                                    cancellationToken: cancellationToken);
      return result;
    }
    public async Task SaveRelation(EntityRelation relation, CancellationToken cancellationToken = default)
    {
      var path = "/api/relation";
      var body = restClientService.SerializeObject(relation);
      await restClientService.PostAsync(path: path,
                                        body: body,
                                        cancellationToken: cancellationToken);
    }
  }
}