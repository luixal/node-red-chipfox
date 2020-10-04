module.exports = function(RED) {

  function getDevicesNode(config) {

    RED.nodes.createNode(this, config);
    var node = this;
    node.on(
      'input',
      async function(msg) {

        const api = this.context().flow.get('chipfoxClient');
        if (!api) return [null, 'No API found, you should run login node first'];

        try {

          let devices = await api.getDevices();
          msg.payload = devices;
          node.send([msg, null]);

        } catch(error) {

          msg.payload = error;
          node.send([null, msg]);

        }
      }
    );
  }
  RED.nodes.registerType('get-devices', getDevicesNode);
}
