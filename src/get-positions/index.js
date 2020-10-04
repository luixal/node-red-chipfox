module.exports = function(RED) {

  function getPositionsNode(config) {

    RED.nodes.createNode(this, config);
    var node = this;
    node.on(
      'input',
      async function(msg) {

        const api = this.context().flow.get('chipfoxClient');
        const deviceId = config.device || msg.payload.device;
        if (!api) return [null, 'No API found, you should run login node first'];
        if (!deviceId) return [null, 'You must provide a device id'];
        
        let limit = config.limit || msg.payload.limit;
        let after = config.after || msg.payload.after;
        if (after) after = new Date(after);
        let before = config.before || msg.payload.before;
        if (before) before = new Date(before);

        try {

          let query = {};
          if (limit) query.limit = limit;
          if (after) query.after = after;
          if (before) query.before = before;
          let positions = await api.getDevicePositions(deviceId, query);
          msg.payload = positions;
          node.send([msg, null]);

        } catch(error) {

          msg.payload = error;
          node.send([null, msg]);

        }
      }
    );
  }
  RED.nodes.registerType('get-positions', getPositionsNode);
}
