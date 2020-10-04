const ChipFoxClient = require('ts-chipfox-client').ChipFoxClient;

module.exports = function(RED) {

  function login(config) {

    RED.nodes.createNode(this, config);
    var node = this;
    node.on(
      'input',
      async function(msg) {
        this.context().flow.set('chipfoxClient', new ChipFoxClient(msg.payload.username || config.username, msg.payload.password || config.password, msg.payload.uuid || config.uuid));
        const api = this.context().flow.get('chipfoxClient');

        try {

          let response = await api.login();
          msg.payload = response;
          node.send([msg, null]);

        } catch(error) {

          msg.payload = error;
          node.send([null, msg]);

        }
      }
    );
  }
  RED.nodes.registerType('login', login);
}
