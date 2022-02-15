"use strict";

const ChannelManager = (function() {
  const channels = {};
  const formats = ['ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'NULL', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT', 'SYMBOL'];

  // Function that checks type of the input
  // type --- 'string', 'number', 'boolean', 'object', 'function', 'array', 'null', 'undefined', 'bigint', 'symbol'
  function checkType(input, type) {
    switch (type.toLowerCase()) {
      case 'string':
        return (typeof input === 'string' ? true : false);
        break;
      case 'number':
        return (typeof input === 'number' ? true : false);
        break;
      case 'boolean':
        return (typeof input === 'boolean' ? true : false);
        break;
      case 'object':
        return ((typeof input === 'object' && !Array.isArray(input) && input !== null) ? true : false);
        break;
      case 'function':
        return (typeof input === 'function' ? true : false);
        break;
      case 'array':
        return (typeof Array.isArray(input) ? true : false);
        break;
      case 'null':
        return (input === null ? true : false);
        break;
      case 'undefined':
        return (typeof input === 'undefined' ? true : false);
        break;
      case 'bigint':
        return (typeof input === 'bigint' ? true : false);
        break;
      case 'symbol':
        return (typeof input === 'symbol' ? true : false);
        break;
      default:
        throw new Error("Second argument passed to checkType() function must be 'string', 'number', 'boolean', 'object', 'function', 'array', 'null', 'undefined', 'bigint' or 'symbol'.");
    }
  }

  function argumentTypeError(func, type) {
    throw new Error(`Argument passed to ${func}() function must be of '${type}' type.`)
  }

  function isEmptyString(string) {
    return (string === '' ? true : false);
  }

  function emptyStringError(func) {
    throw new Error(`Argument passed to ${func}() function cannot be empty string.`);
  }

  // Fuction that confirms that format is a valid keyword or object with valid keywords as values:
  // ex: 'STRING', 'NUMBER' or {
  //  width: 'NUMBER',
  //  height: 'NUMBER',
  //  color: 'STRING'
  // }
  // Format keyword is case insensitive
  function validateFormat(format) {
    if (checkType(format, 'string')) {
      return validateKeyword(format);
    } else if (checkType(format, 'object')) {
      for (let key in format) {
        if (!validateFormat(format[key])) { return false };
      }

      return true;
    } else {
      throw new Error("Argument passed to validateFormat() function must be 'string' or 'object'.")
    }
  }

  // Fuction that confirms that provided argument is a valid keyword
  // Format keyword is case insensitive
  function validateKeyword(keyword) {
    return (formats.includes(keyword.toUpperCase()) ? true : false);
  }

  function invalidFormatError(func) {
    throw new Error(`Format passed to ${func}() function must be 'ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'NULL', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT', 'SYMBOL' keyword or object.`);
  }

  function invalidKeywordError(func) {
    throw new Error(`Keyword passed to ${func}() function must be 'ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'NULL', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT', 'SYMBOL' keyword.`);
  }

  // Function that checks if data type matches provided format
  function validateData(data, format) {
    if (arguments.length !== 2) {
      throw new Error('validateData() function expects 2 arguments: data and data format.');
      return;
    }
    if (!validateFormat(formatKeyword)) {
      invalidFormatError('validateData');
      return;
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
        invalidFormatError('validateData');
    }
  }

  function validateByKeyword(data, formatKeyword) {
    if (arguments.length !== 2) {
      throw new Error('validateByKeyword() function expects 2 arguments: data and format keyword.');
      return;
    }
    if (!validateKeyword(formatKeyword)) {
      invalidKeywordError('validateByKeyword');
      return;
    };

    switch (formatKeyword) {
      case 'ANY':
        return true;
        break;
      case 'STRING':
        return checkType('string');
        break;
      case 'NUMBER':
        return checkType('number');
        break;
      case 'BOOLEAN':
        return checkType('boolean');
        break;
      case 'UNDEFINED':
        return checkType('undefined');
        break;
      case 'ARRAY':
        return checkType('array');
        break;
      case 'OBJECT':
        return checkType('object');
        break;
      case 'FUNCTION':
        return checkType('function');
        break;
      case 'BIGINT':
        return checkType('bigint');
        break;
      case 'SYMBOL':
        return checkType('symbol');
        break;
      default:
        invalidKeywordError('validateByKeyword');
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
      if (!checkType(name, 'string')) {
        argumentTypeError('open', 'string');
        return;
      }
      if (isEmptyString(name)) {
        emptyStringError('open');
        return;
      }

      if (!channels[name]) {
        channels[name] = {
          dataHeaders: null,
          data: null,
          listeners: new Set(),
          tmpListeners: new Set()
        }
      }
    },
    exists(name) {
      if (!checkType(name, 'string')) {
        argumentTypeError('exists', 'string');
        return;
      }
      if (isEmptyString(name)) {
        emptyStringError('exists');
        return;
      }

      return name in channels;
    },
    close(name) {
      if (!checkType(name, 'string')) {
        argumentTypeError('close', 'string');
        return;
      }
      if (isEmptyString(name)) {
        emptyStringError('close');
        return;
      }
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      delete channels[name];
    },
    send(name, data, headers={}, filter, callback) {
      if (arguments.length < 2) {
        throw new Error('send() function expects at least 2 arguments: channel name and data.');
        return;
      }

      if (!checkType(name, 'string')) {
        throw new Error("First argument passed to send() function must be of 'string' type.");
        return;
      }
      if (isEmptyString(name)) {
        emptyStringError('send');
        return;
      }
      if (!ChannelManager.exists(name)) {
        throw new Error (`Channel with name '${name}' does not exist.`);
        return;
      }

      if (!checkType(headers, 'object')) {
        throw new Error('Third argument passed to send() function must be an object.');
        return;
      }

      // Throws custom error if the filter is not of string or object type
      try {
        validateFormat(filter);
      } catch(error) {
        throw new Error(`Fourth argument passed to send() function must be 'ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'NULL', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT', 'SYMBOL' keyword or object.`);
        return;
      }

      if (!validateFormat(filter)) {
        throw new Error(`Fourth argument passed to send() function must be 'ANY', 'STRING', 'NUMBER','BOOLEAN', 'UNDEFINED', 'NULL', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT', 'SYMBOL' keyword or object.`);
        return;
      }

      if (!checkType(callback, 'function')) {
        throw new Error("Fifth argument passed to send() function must be of 'function' type.");
        return;
      }

      // Validate data according to the format
      // if (!validateData(data, channels[name].format)) {
      //   throw new Error(`Data passed to .send() function does not match data format for '${name}' channel. Run .getFormat('${name}') to check the data format.`);
      //   return;
      // }

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
