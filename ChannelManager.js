"use strict";

const ChannelManager = (function() {
  const channels = {};

  // type --- 'string', 'number', 'boolean', 'object', 'function'
  function checkType(input, type, functionName) {
    switch (type) {
      case 'string':
        if (typeof input === 'string') {
          return true;
        } else {
          throw new Error(`Argument passed to .${functionName}() function must be of 'string' type.`);
          return false;
        }
        break;
      case 'number':
        if (typeof input === 'number') {
          return true;
        } else {
          throw new Error(`Argument passed to .${functionName}() function must be of 'number' type.`);
          return false;
        }
        break;
      case 'boolean':
        if (typeof input === 'boolean') {
          return true;
        } else {
          throw new Error(`Argument passed to .${functionName}() function must be of 'boolean' type.`);
          return false;
        }
        break;
      case 'object':
        if (typeof input === 'object') {
          return true;
        } else {
          throw new Error(`Argument passed to .${functionName}() function must be of 'object' type.`);
          return false;
        }
        break;
      case 'function':
        if (typeof input === 'function') {
          return true;
        } else {
          throw new Error(`Argument passed to .${functionName}() function must be of 'function' type.`);
          return false;
        }
        break;
      default:
        throw new Error("Second argument passed to checkType function must be 'string', 'number', 'boolean', 'object' or 'function'");
    }
  }

  function isEmptyString(string, functionName) {
    if (string === '') {
      throw new Error(`Argument passed to .${functionName}() cannot be empty string.`);
      return true;
    } else {
      return false;
    }
  }

  return {
    openChannel(name) {
      if (!checkType(name, 'string', 'openChannel')) {return;}
      if (isEmptyString(name, 'openChannel')) {return;}

      channels[name] = {};
    },
    closeChannel() {},
    sendData() {},
    listen() {},
    listenOnce() {},
    setFormat() {},
    getFormat() {},
    exists(name) {
      if (!checkType(name, 'string', 'exists')) {return;}

      return name in channels;
    }
  }
})();

// FOR BROWSERS
//export default ChannelManager;

// FOR NODE.JS
module.exports = ChannelManager;
