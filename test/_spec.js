var should = require('should');
var helper = require('node-red-node-test-helper');
var getPositionsNode = require('../src/get-positions/index.js');

helper.init(require.resolve('node-red'));

describe(
  'get-positions Node',
  function() {

    beforeEach(function(done) { helper.startServer(done); });

    afterEach(function(done) { helper.unload(); helper.stopServer(done); });

    it(
      'should be loaded',
      function(done) {
        var flow = [{ id:'n1', type: 'get-positions', name: "get positions" }];
        helper.load(
          getPositionsNode,
          flow,
          function() {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'get positions');
            done();
          }
        );
      }
    );

    it(
      'should get some random data in an object',
      function(done) {
        var flow = [
          { id: 'n1', type: 'get-positions', name: 'get positions', wires: [['n2']]},
          { id: 'n2', type: 'helper'}
        ];

        helper.load(
          getPositionsNode,
          flow,
          function() {
            var n2 = helper.getNode('n2');
            var n1 = helper.getNode('n1');

            n2.on(
              'input',
              function(msg) {
                msg.should.have.property(
                  'payload'
                );
                done();
              }
            );

            n1.receive({ payload: 'whatever!' });
          }
        );
      }
    );
  }
);
