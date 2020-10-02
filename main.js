const ChipFoxClient = require('ts-chipfox-client').ChipFoxClient;

const api = new ChipFoxClient('laperez@grupoclece.com', 'QKC94tz0sc6rv', '650fb83d-1e1f-2284-5b9f-dfc857fddb7b');

api.login()
  .then(
    (response) => {
      console.log(response);
      api.getDevices()
      .then(
        (devices) => {
          console.log(devices);
          devices.map(device => console.log(`${device.name} (${device.id}): ${device.lat}, ${device.lng} @ ${device.lastSeen}`) );
        }
      )
      .catch(
        error => console.log(error)
      )
    }
  )
  .catch(
    error => console.log(error)
  )
