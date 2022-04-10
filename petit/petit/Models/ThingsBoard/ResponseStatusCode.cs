namespace petit.Models.ThingsBoard
{
  public enum ResponseStatusCode
  {
    _100CONTINUE = 1,
    _101SWITCHINGPROTOCOLS = 2,
    _102PROCESSING = 3,
    _103CHECKPOINT = 4,
    _200OK = 5,
    _201CREATED = 6,
    _202ACCEPTED = 7,
    _203NONAUTHORITATIVEINFORMATION = 8,
    _204NOCONTENT = 9,
    _205RESETCONTENT = 10,
    _206PARTIALCONTENT = 11,
    _207MULTISTATUS = 12,
    _208ALREADYREPORTED = 13,
    _226IMUSED = 14,
    _300MULTIPLECHOICES = 15,
    _301MOVEDPERMANENTLY = 16,
    _302FOUND = 17,
    _302MOVEDTEMPORARILY = 18,
    _303SEEOTHER = 19,
    _304NOTMODIFIED = 20,
    _305USEPROXY = 21,
    _307TEMPORARYREDIRECT = 22,
    _308PERMANENTREDIRECT = 23,
    _400BADREQUEST = 24,
    _401UNAUTHORIZED = 25,
    _402PAYMENTREQUIRED = 26,
    _403FORBIDDEN = 27,
    _404NOTFOUND = 28,
    _405METHODNOTALLOWED = 29,
    _406NOTACCEPTABLE = 30,
    _407PROXYAUTHENTICATIONREQUIRED = 31,
    _408REQUESTTIMEOUT = 32,
    _409CONFLICT = 33,
    _410GONE = 34,
    _411LENGTHREQUIRED = 35,
    _412PRECONDITIONFAILED = 36,
    _413PAYLOADTOOLARGE = 37,
    _413REQUESTENTITYTOOLARGE = 38,
    _414URITOOLONG = 39,
    _414REQUESTURITOOLONG = 40,
    _415UNSUPPORTEDMEDIATYPE = 41,
    _416REQUESTEDRANGENOTSATISFIABLE = 42,
    _417EXPECTATIONFAILED = 43,
    _418IAMATEAPOT = 44,
    _419INSUFFICIENTSPACEONRESOURCE = 45,
    _420METHODFAILURE = 46,
    _421DESTINATIONLOCKED = 47,
    _422UNPROCESSABLEENTITY = 48,
    _423LOCKED = 49,
    _424FAILEDDEPENDENCY = 50,
    _425TOOEARLY = 51,
    _426UPGRADEREQUIRED = 52,
    _428PRECONDITIONREQUIRED = 53,
    _429TOOMANYREQUESTS = 54,
    _431REQUESTHEADERFIELDSTOOLARGE = 55,
    _451UNAVAILABLEFORLEGALREASONS = 56,
    _500INTERNALSERVERERROR = 57,
    _501NOTIMPLEMENTED = 58,
    _502BADGATEWAY = 59,
    _503SERVICEUNAVAILABLE = 60,
    _504GATEWAYTIMEOUT = 61,
    _505HTTPVERSIONNOTSUPPORTED = 62,
    _506VARIANTALSONEGOTIATES = 63,
    _507INSUFFICIENTSTORAGE = 64,
    _508LOOPDETECTED = 65,
    _509BANDWIDTHLIMITEXCEEDED = 66,
    _510NOTEXTENDED = 67,
    _511NETWORKAUTHENTICATIONREQUIRED = 68
  }
}