const EventEmitter = require('events');
const { isModuleNamespaceObject } = require('util/types');
const uuid = require('uuid');

class Logger extends EventEmitter {

    log(msg){
        this.emit('message', {id: uuid.v4(), msg });
    }
}

module.exports = Logger;