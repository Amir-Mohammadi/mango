using Newtonsoft.Json;

namespace hermes.Models
{
    public class ResponseModel
    {
        [JsonProperty("isSuccess")]
        public bool IsSuccess { get; set; }
        [JsonProperty("message")]
        public string? Message { get; set; }
    }
}
