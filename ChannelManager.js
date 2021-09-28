"use strict";

const ChannelManager = (function() {
  const channels = {};
  const formats = ['ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT'];

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

      if (!channels[name]) {
        channels[name] = {
          format: 'ANY'
        }
      }
    },
    closeChannel(name) {
      if (!checkType(name, 'string', 'closeChannel')) {return;}
      if (isEmptyString(name, 'closeChannel')) {return;}
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist`);
        return;
      }

      delete channels[name];
    },
    sendData(name, data, headers) {
      // headers - data headers object
    },
    listen() {},
    listenOnce() {},
    setFormat(name, format) {
      // format can either be
      // 'ANY', 'STRING', 'NUMBER',
      // 'BOOLEAN', 'UNDEFINED', 'ARRAY',
      // 'OBJECT', 'FUNCTION', 'BIGINT' or object
      if (arguments.length !== 2) {
        throw new Error('.setFormat() function expects 2 arguments: channel name and data format.');
        return;
      }

      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist`);
        return;
      }

      switch (typeof format) {
        case 'string':
          if (!formats.includes(format)) {
            throw new Error(`Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`);
            return;
          } else {
            channels[name].format = format;
          }
          break;
        case 'object':
          if (Object.keys(format).length === 0) {
            throw new Error('Format object, passed to .setFormat() cannot be empty');
            return;
          }

          // Enumerate through object properties and check if values are valid keywords
          for (let key in format) {
            if (!formats.includes(format[key])) {
              throw new Error(`Values of format object, passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword.`);
              return;
            }
          }

          channels[name].format = format;
          break;
        default:
          throw new Error(`Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`);
          return;
      }
    },
    getFormat(name) {
      if (!checkType(name, 'string', 'getFormat')) {return;}
      if (isEmptyString(name, 'getFormat')) {return;}
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist`);
        return;
      }

      return channels[name].format;
    },
    exists(name) {
      if (!checkType(name, 'string', 'exists')) {return;}
      if (isEmptyString(name, 'exists')) {return;}

      return name in channels;
    }
  }
})();

// FOR BROWSERS
//export default ChannelManager;

// FOR NODE.JS
module.exports = ChannelManager;
