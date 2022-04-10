# IoT Project Documents

![](/docs/assets/system-topology-v1.jpg)

## Services

### thingsboard
we are using the community edition of the thingsboard as message broker. but the users and devices also saved 
in the thingsboard server. 

### petit
this is the core api of the system. this api used for auth, users, devices and more.
it's also act as a wrapper over the thingsboard api to give us more control and freedom in the case of user management and device creation.

### porto
this is the end user mobile app, it communicate with petit and thingsboard.  

## Processes

### Config a device
config a device means tha user is going to provide the SSID and password for the selected wifi

`(POST) {DEVICE_API}/config/data`
```json
// request
{
  "ssid": "string",
  "password" :"string",
  "pairKey": "string",
  "ownerKey":"string",
  "accessToken":"string"
}
``` 


`(GET) {DEVICE_API}/config/current-status`
```json
// response
{
  "statusCode" : 0,
  "title": "string",
  "description": "string" // for extra info,for ex in the errors
}
/** status code list: 
* 1. connecting to wifi
* 2. connected to wifi
* 3. connecting to server (connect the mqtt and send the pair key)
* 4. config finished
* 5. error in connecting to wifi
* 6. error in connecting to server
**/

/** errors in connecting to server titles
* (pubsub client errors)
* MQTT_CONNECTION_TIMEOUT
* MQTT_CONNECTION_LOST
* MQTT_CONNECT_FAILED
* MQTT_DISCONNECTED
* MQTT_CONNECT_BAD_PROTOCOL
* MQTT_CONNECT_BAD_CLIENT_ID
* MQTT_CONNECT_UNAVAILABLE
* MQTT_CONNECT_BAD_CREDENTIALS
* MQTT_CONNECT_UNAUTHORIZED
* (server errors)
* SERVER_REQUEST_TIMEOUT
* SERVER_ERROR
*/

/** errors in connecting to wifi titles
* WIFI_CONNECT_BAD_CREDENTIALS
*/
```

**version 2 edit:**

in the new version device will not get disconnected after receiving the 
SSID and password. that means we will get details of errors if any happens



![](/docs/assets/config-process-v2.jpg)

### Provisioning
*NOTE: this is a temporary solution* 

1. device post a `get` request with mac address  in it.
2. server check the device. if there is not a device with 
the provided mac address, it will create one and 
respond with access token.

`(GET)  {SERVER_API}/debug/provisioning`

```json
// request model
{
  "mac-address": "CE:13:14:15"
}
// response
{
  "access-token": "fHdf34H66sSc&"
}
```