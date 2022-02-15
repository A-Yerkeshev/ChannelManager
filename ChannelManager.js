"use strict";

const ChannelManager = (function() {
  const channels = {};
  const formats = ['ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT'];

  // Function that checks type of the input
  // type --- 'string', 'number', 'boolean', 'object', 'function', 'array', 'null', 'undefined', 'bigint', 'symbol'
  function checkType(input, type) {
    switch (type) {
      case 'string':
        typeof input === 'string' ? true : false;
        break;
      case 'number':
        typeof input === 'number' ? true : false;
        break;
      case 'boolean':
        typeof input === 'boolean' ? true : false;
        break;
      case 'object':
        (typeof input === 'object' && input !== null) ? true : false;
        break;
      case 'function':
        typeof input === 'function' ? true : false;
        break;
      case 'array':
        typeof Array.isArray(input) ? true : false;
        break;
      case 'null':
        input === null ? true : false;
        break;
      case 'undefined':
        typeof input === 'undefined' ? true : false;
        break;
      case 'bigint':
        typeof input === 'bigint' ? true : false;
        break;
      case 'symbol':
        typeof input === 'symbol' ? true : false;
        break;
      default:
        throw new Error("Second argument passed to checkType() function must be 'string', 'number', 'boolean', 'object', 'function', 'array', 'null', 'undefined', 'bigint' or 'symbol'.");
    }
  }

  function argumentTypeError() {}

  function isEmptyString(string, functionName) {
    if (string === '') {
      throw new Error(`Argument passed to .${functionName}() cannot be empty string.`);
      return true;
    } else {
      return false;
    }
  }

  function validateFormat(format) {
    switch (typeof format) {
      case 'string':
        formats.includes(format) ? true : false;
        break;
      case 'object':
        for (let key in format) {
          if (!validateFormat(format[key])) {return false};
        }

        return true;
        break;
      default:
        throw new Error("Argument passed to validateFormat() function must be 'string' or 'object'.")
    }
  }

  function validateData(data, format) {
    if (arguments.length !== 2) {
      throw new Error('validateData() function expects 2 arguments: data and data format.');
      return;
    }
    if (!validateFormat(formatKeyword)) {
      throw new Error(`Format passed to validateData() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`);
      return
    };

    switch (typeof format) {
      case 'string':
        return validateByKeyword(data, format);
        break;
      case 'object':
        // Enumerate format object properties and check if same properties exist on data object and their data type is valid
        for (let key in format) {
          if (!data.hasOwnProperty(key) || !validateByKeyword(data[key], format[key])) {
            return false;
          }
        }

        return true;
        break;
      default:
        throw new Error(`Format passed to validateData() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`);
    }
  }

  function validateByKeyword(data, formatKeyword) {
    if (arguments.length !== 2) {
      throw new Error('validateByKeyword() function expects 2 arguments: data and format keyword.');
      return;
    }
    if (!validateFormat(formatKeyword)) {
      throw new Error(`Keyword passed to validateByKeyword() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT'.`);
      return
    };

    switch (formatKeyword) {
      case 'ANY':
        return true;
        break;
      case 'STRING':
        return typeof data === 'string';
        break;
      case 'NUMBER':
        return typeof data === 'number';
        break;
      case 'BOOLEAN':
        return typeof data === 'boolean';
        break;
      case 'UNDEFINED':
        return typeof data === 'undefined';
        break;
      case 'ARRAY':
        return checkType('array');
        break;
      case 'OBJECT':
        return checkType('object');
        break;
      case 'FUNCTION':
        return typeof data === 'function';
        break;
      case 'BIGINT':
        return typeof data === 'bigint';
        break;
      case 'SYMBOL':
        return typrof data === 'symbol';
        break;
      default:
        throw new Error(`Keyword passed to validateByKeyword() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT'.`);
    }
  }

  function runCallbacks(callbacks, data, headers) {
    const results = [];

    callbacks.forEach((callback) => {
      if (!checkType(callback, 'function', 'runCallbacks')) {return;}

      results.push(callback(data, headers));
    })

    return results;
  }

  function runCallbacksOnce(callbacks, data, headers, name) {
    if (!ChannelManager.exists(name)) {
      throw new Error (`Channel with name '${name}' does not exist.`);
      return;
    }

    const results = [];

    callbacks.forEach((callback) => {
      if (!checkType(callback, 'function', 'runCallbacks')) {return;}

      resutls.push(callback(data, headers));

      if (channels[name].tmpListeners.has(callback)) {
        channels[name].tmpListeners.delete(callback);
      } else {
        throw new Error(`Callback with name '${callback.name}' does not listen to channel '${name}'.`);
        return;
      }

      return results;
    })
  }

  return {
    open(name) {
      if (!checkType(name, 'string', 'open')) {return;}
      if (isEmptyString(name, 'open')) {return;}

      if (!channels[name]) {
        channels[name] = {
          format: 'ANY',
          dataHeaders: null,
          data: null,
          listeners: new Set(),
          tmpListeners: new Set()
        }
      }
    },
    close(name) {
      if (!checkType(name, 'string', 'close')) {return;}
      if (isEmptyString(name, 'close')) {return;}
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      delete channels[name];
    },
    send(name, data, headers={}, filter, callback) {
      if (arguments.length < 2) {
        throw new Error('.send() function expects at least 2 arguments: channel name and data.');
        return;
      }

      if (!checkType(name, 'string', 'send')) {return;}
      if (!checkType(headers, 'object', 'send')) {return;}
      if (isEmptyString(name, 'send')) {return;}
      if (!validateFormat(filter)) {
        throw new Error(`Fourth argument passed to validateData() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`)
        return;
      }
      if (!checkType(callback, 'function', 'send')) {return;}

      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      // Validate data according to the format
      // if (!validateData(data, channels[name].format)) {
      //   throw new Error(`Data passed to .send() function does not match data format for '${name}' channel. Run .getFormat('${name}') to check the data format.`);
      //   return;
      // }

      if (typeof headers !== 'object' || Array.isArray(headers) || headers == null) {
        throw new Error('Data headers argument passed to .send() function must be an object.');
        return;
      }

      const channel = channels[name];

      channel.dataHeaders = headers;
      channel.data = data;

      const results = runCallbacks(channel.listeners, data, headers);
      const resultsOnce = runCallbacksOnce(channel.tmpListeners, data, headers, name);

      return [...results, ...resultsOnce];
    },
    listen(name, ...callbacks) {
      if (arguments.length < 2) {
        throw new Error('.listen() function expects at least 2 arguments: channel name and callback.');
        return;
      }
      if (!checkType(name, 'string', 'listen')) {return;}
      if (isEmptyString(name, 'listen')) {return;}
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      callbacks.forEach((callback) => {
        if (!checkType(callback, 'function', 'listen')) {return;}
      })

      channels[name].listeners = new Set(Array.from(channels[name].listeners).concat(callbacks));
    },
    listenOnce(name, ...callbacks) {
      if (arguments.length < 2) {
        throw new Error('.listenOnce() function expects at least 2 arguments: channel name and callback.');
        return;
      }
      if (!checkType(name, 'string', 'listenOnce')) {return;}
      if (isEmptyString(name, 'listenOnce')) {return;}
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      callbacks.forEach((callback) => {
        if (!checkType(callback, 'function', 'listenOnce')) {return;}
      })

      channels[name].tmpListeners = new Set(Array.from(channels[name].tmpListeners).concat(callbacks));
    },
    unlisten(name, ...callbacks) {
      if (arguments.length < 2) {
        throw new Error('.unlisten() function expects at least 2 arguments: channel name and callback.');
        return;
      }
      if (!checkType(name, 'string', 'unlisten')) {return;}
      if (isEmptyString(name, 'unlisten')) {return;}
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      callbacks.forEach((callback) => {
        if (!checkType(callback, 'function', 'unlisten')) {return;}

        if (channels[name].listeners.has(callback)) {
          channels[name].listeners.delete(callback);
        } else {
          throw new Error(`Callback with name '${callback.name}' does not listen to channel '${name}'.`);
          return;
        }
      })
    },
    // setFormat(name, format) {
    //   // format can either be
    //   // 'ANY', 'STRING', 'NUMBER',
    //   // 'BOOLEAN', 'UNDEFINED', 'ARRAY',
    //   // 'OBJECT', 'FUNCTION', 'BIGINT' or object
    //   if (arguments.length !== 2) {
    //     throw new Error('.setFormat() function expects 2 arguments: channel name and data format.');
    //     return;
    //   }
    //   if (!checkType(name, 'string', 'setFormat')) {return;}
    //   if (isEmptyString(name, 'setFormat')) {return;}
    //   if (!ChannelManager.exists(name)) {
    //     throw new Error (`Channel with name '${name}' does not exist.`);
    //     return;
    //   }

    //   switch (typeof format) {
    //     case 'string':
    //       if (!formats.includes(format)) {
    //         throw new Error(`Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`);
    //         return;
    //       } else {
    //         channels[name].format = format;
    //       }
    //       break;
    //     case 'object':
    //       if (Array.isArray(format)) {
    //         throw new Error('Format object passed to .setFormat() cannot be array.');
    //         return;
    //       }
    //       if (!format) {
    //         throw new Error('Format object passed to .setFormat() cannot be null.');
    //         return;
    //       }
    //       if (Object.keys(format).length === 0) {
    //         throw new Error('Format object passed to .setFormat() cannot be empty.');
    //         return;
    //       }

    //       // Enumerate through object properties and check if values are valid keywords
    //       for (let key in format) {
    //         if (!formats.includes(format[key])) {
    //           throw new Error(`Values of format object, passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword.`);
    //           return;
    //         }
    //       }

    //       channels[name].format = format;
    //       break;
    //     default:
    //       throw new Error(`Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.`);
    //       return;
    //   }
    // },
    // getFormat(name) {
    //   if (!checkType(name, 'string', 'getFormat')) {return;}
    //   if (isEmptyString(name, 'getFormat')) {return;}
    //   if (!ChannelManager.exists(name)) {
    //     throw new Error (`Channel with name '${name}' does not exist.`);
    //     return;
    //   }

    //   return channels[name].format;
    // },
    exists(name) {
      if (!checkType(name, 'string', 'exists')) {return;}
      if (isEmptyString(name, 'exists')) {return;}

      return name in channels;
    },
    // request(reqChannel, resChannel) {
    //   if (arguments.length !== 2) {
    //     throw new Error('.request() function expects 2 arguments: request channel name and response channel name.');
    //     return;
    //   }
    //   if (!checkType(reqChannel, 'string', 'request')) {return;}
    //   if (!checkType(resChannel, 'string', 'request')) {return;}
    //   if (isEmptyString(reqChannel, 'request')) {return;}
    //   if (isEmptyString(resChannel, 'request')) {return;}
    //   if (!ChannelManager.exists(reqChannel)) {
    //     throw new Error (`Channel with name '${reqChannel}' does not exist.`);
    //     return;
    //   }
    //   if (!ChannelManager.exists(resChannel)) {
    //     throw new Error (`Channel with name '${resChannel}' does not exist.`);
    //     return;
    //   }

    //   let result;

    //   this.listen(resChannel, (data) => {
    //     result = data;
    //   })
    //   this.send(reqChannel, true);

    //   return result;
    // }
  }
})();

// FOR BROWSERS
//export default ChannelManager;

// FOR NODE.JS
module.exports = ChannelManager;
