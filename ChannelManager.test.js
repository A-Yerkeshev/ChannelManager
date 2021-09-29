const CM = require('./ChannelManager.js');

test("Open channel", () => {
  expect(() => {CM.openChannel()}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel(2)}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel(true)}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel([1,2,3])}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel({})}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel(function testFunc() {})}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel(null)}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");
  expect(() => {CM.openChannel(undefined)}).toThrow("Argument passed to .openChannel() function must be of 'string' type.");

  expect(() => {CM.openChannel('')}).toThrow("Argument passed to .openChannel() cannot be empty string.");

  CM.openChannel('test-channel');

  expect(CM.exists('test-channel')).toBe(true);

  // Check if default data format is 'ANY'
  expect(CM.getFormat('test-channel')).toBe('ANY');
});

test("Check if channel exists", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.exists()}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(2)}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(true)}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists([1,2,3])}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists({})}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(function testFunc() {})}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(null)}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(undefined)}).toThrow("Argument passed to .exists() function must be of 'string' type.");

  expect(() => {CM.exists('')}).toThrow("Argument passed to .exists() cannot be empty string.");

  expect(CM.exists('test-channel')).toBe(true);
  expect(CM.exists('non-existent-channel')).toBe(false);
})

test("Close channel", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.closeChannel()}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel(2)}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel(true)}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel([1,2,3])}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel({})}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel(function testFunc() {})}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel(null)}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");
  expect(() => {CM.closeChannel(undefined)}).toThrow("Argument passed to .closeChannel() function must be of 'string' type.");

  expect(() => {CM.closeChannel('')}).toThrow("Argument passed to .closeChannel() cannot be empty string.");
  expect(() => {CM.closeChannel('non-existent-channel')}).toThrow("Channel with name 'non-existent-channel' does not exist.");

  CM.closeChannel('test-channel');
  expect(CM.exists('test-channel')).toBe(false);
})

test("Get Format", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.getFormat()}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat(2)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat(true)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat([1,2,3])}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat({})}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat(function testFunc() {})}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat(null)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat(undefined)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat(NaN)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
  expect(() => {CM.getFormat('')}).toThrow("Argument passed to .getFormat() cannot be empty string.");
  expect(() => {CM.getFormat('non-existent-channel')}).toThrow("Channel with name 'non-existent-channel' does not exist.");

  expect(CM.getFormat('test-channel')).toBe('ANY');

  const format = {
    width: 'NUMBER',
    height: 'NUMBER',
    color: 'STRING'
  }

  CM.setFormat('test-channel', format);
  expect(CM.getFormat('test-channel')).toBe(format);
})

test("Set format", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.setFormat()}).toThrow(".setFormat() function expects 2 arguments: channel name and data format.");
  expect(() => {CM.setFormat('non-existent-channel', 'ANY')}).toThrow("Channel with name 'non-existent-channel' does not exist.");
  expect(() => {CM.setFormat('', 'ANY')}).toThrow("Argument passed to .setFormat() cannot be empty string.");

  expect(() => {CM.setFormat(1, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
  expect(() => {CM.setFormat(true, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
  expect(() => {CM.setFormat([1,2,3], 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
  expect(() => {CM.setFormat({}, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
  expect(() => {CM.setFormat(function testFunc() {}, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
  expect(() => {CM.setFormat(null, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
  expect(() => {CM.setFormat(undefined, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");

  expect(() => {CM.setFormat('test-channel', 'wrong-string')}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
  expect(() => {CM.setFormat('test-channel', 1)}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
  expect(() => {CM.setFormat('test-channel', true)}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
  expect(() => {CM.setFormat('test-channel', [1,2,3])}).toThrow("Format object passed to .setFormat() cannot be array.");
  expect(() => {CM.setFormat('test-channel', {})}).toThrow("Format object passed to .setFormat() cannot be empty.");
  expect(() => {CM.setFormat('test-channel', function testFunc() {})}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
  expect(() => {CM.setFormat('test-channel', null)}).toThrow("Format object passed to .setFormat() cannot be null.");
  expect(() => {CM.setFormat('test-channel', undefined)}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");

  CM.setFormat('test-channel', 'STRING');
  expect(CM.getFormat('test-channel')).toBe('STRING');

  const format = {
    width: 'NUMBER',
    height: 'NUMBER',
    color: 'STRING'
  }

  CM.setFormat('test-channel', format);
  expect(CM.getFormat('test-channel')).toBe(format);

  const invalidFormat = {
    width: 589
  }

  expect(() => {CM.setFormat('test-channel', invalidFormat)}).toThrow("Values of format object, passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword.");
})

test("Send data", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.sendData()}).toThrow(".sendData() function expects at least 2 arguments: channel name and data.");
  expect(() => {CM.sendData('', 'data')}).toThrow("Argument passed to .sendData() cannot be empty string.");
  expect(() => {CM.sendData('non-existent-channel', 'data')}).toThrow("Channel with name 'non-existent-channel' does not exist.");

  expect(() => {CM.sendData(1, 'data')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");
  expect(() => {CM.sendData(false, 'data')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");
  expect(() => {CM.sendData([1,2,3], 'data')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");
  expect(() => {CM.sendData({}, 'data')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");
  expect(() => {CM.sendData(function testFunc() {}, 'string')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");
  expect(() => {CM.sendData(null, 'data')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");
  expect(() => {CM.sendData(undefined, 'data')}).toThrow("Argument passed to .sendData() function must be of 'string' type.");

  CM.setFormat('test-channel', 'NUMBER');
  expect(CM.sendData('test-channel', 1000)).toBe(undefined);

  expect(() => {CM.sendData('test-channel', 'data')}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  expect(() => {CM.sendData('test-channel', false)}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  expect(() => {CM.sendData('test-channel', [1,2,3])}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  expect(() => {CM.sendData('test-channel', {})}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  expect(() => {CM.sendData('test-channel', function testFunc() {})}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  expect(() => {CM.sendData('test-channel', null)}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  expect(() => {CM.sendData('test-channel', undefined)}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");

  const format = {
    width: 'NUMBER',
    length: 'NUMBER',
    color: 'STRING'
  }

  CM.setFormat('test-channel', format);

  const validData = {
    width: 15,
    length: 25,
    color: 'red'
  }

  const invalidData = {
    width: '1001',
    length: false
  }

  expect(CM.sendData('test-channel', validData)).toBe(undefined);

  expect(() => {CM.sendData('test-channel', invalidData)}).toThrow("Data passed to .sendData() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
})
