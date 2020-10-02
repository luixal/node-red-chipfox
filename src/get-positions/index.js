const ChipFoxClient = require('ts-chipfox-client').ChipFoxClient;

module.exports = function(RED) {

  function getPositionsNode(config) {

    RED.nodes.createNode(this, config);
    var node = this;
    node.on(
      'input',
      async function(msg) {
        console.log(config);
        this.context().flow.set('chipfoxClient', new ChipFoxClient(config.username, config.password, config.uuid));
        const api = this.context().flow.get('chipfoxClient');
        const deviceId = config.device || msg.payload.device;
        let limit = config.limit || msg.payload.limit;
        let after = config.after || msg.payload.after;
        if (after) after = new Date(after);
        let before = config.before || msg.payload.before;
        if (before) before = new Date(before);
        console.log(after);
        console.log(before);

        try {
          let response = await api.login();
          console.log(response)
          let devices = await api.getDevices();
          console.log(devices);
          // build query object:
          let query = {};
          if (limit) query.limit = limit;
          if (after) query.after = after.getTime() / 1000;
          if (before) query.before = before.getTime() / 1000;
          let positions = await api.getDevicePositions(deviceId, query);
          console.log(positions);
          msg.payload = {response, devices, positions};
          node.send([msg, null]);
        } catch(error) {
          msg.payload = error;
          node.send([null, error]);
        }
      }
    );
  }
  RED.nodes.registerType('get-positions', getPositionsNode);
}
