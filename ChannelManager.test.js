const CM = require('./ChannelManager.js');

test("Open channel", () => {
  expect(() => {CM.openChannel()}).toThrow();
  expect(() => {CM.openChannel(2)}).toThrow();
  expect(() => {CM.openChannel(true)}).toThrow();
  expect(() => {CM.openChannel([1,2,3])}).toThrow();
  expect(() => {CM.openChannel({})}).toThrow();
  expect(() => {CM.openChannel(function testFunc() {})}).toThrow();
  expect(() => {CM.openChannel(null)}).toThrow();
  expect(() => {CM.openChannel(undefined)}).toThrow();
  expect(() => {CM.openChannel(NaN)}).toThrow();
  expect(() => {CM.openChannel('')}).toThrow();

  CM.openChannel('test-channel');

  expect(CM.exists('test-channel')).toBe(true);

  // Check if default data format is 'ANY'
  expect(CM.getFormat('test-channel')).toBe('ANY');
});

test("Check if channel exists", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.exists()}).toThrow();
  expect(() => {CM.exists(2)}).toThrow();
  expect(() => {CM.exists(true)}).toThrow();
  expect(() => {CM.exists([1,2,3])}).toThrow();
  expect(() => {CM.exists({})}).toThrow();
  expect(() => {CM.exists(function testFunc() {})}).toThrow();
  expect(() => {CM.exists(null)}).toThrow();
  expect(() => {CM.exists(undefined)}).toThrow();
  expect(() => {CM.exists(NaN)}).toThrow();
  expect(() => {CM.exists('')}).toThrow();

  expect(CM.exists('test-channel')).toBe(true);
  expect(CM.exists('non-existent-channel')).toBe(false);
})

test("Close channel", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.closeChannel()}).toThrow();
  expect(() => {CM.closeChannel(2)}).toThrow();
  expect(() => {CM.closeChannel(true)}).toThrow();
  expect(() => {CM.closeChannel([1,2,3])}).toThrow();
  expect(() => {CM.closeChannel({})}).toThrow();
  expect(() => {CM.closeChannel(function testFunc() {})}).toThrow();
  expect(() => {CM.closeChannel(null)}).toThrow();
  expect(() => {CM.closeChannel(undefined)}).toThrow();
  expect(() => {CM.closeChannel(NaN)}).toThrow();
  expect(() => {CM.closeChannel('')}).toThrow();
  expect(() => {CM.closeChannel('non-existent-channel')}).toThrow();

  CM.closeChannel('test-channel');
  expect(CM.exists('test-channel')).toBe(false);
})

test("Get Format", () => {
  CM.openChannel('test-channel');

  expect(() => {CM.getFormat()}).toThrow();
  expect(() => {CM.getFormat(2)}).toThrow();
  expect(() => {CM.getFormat(true)}).toThrow();
  expect(() => {CM.getFormat([1,2,3])}).toThrow();
  expect(() => {CM.getFormat({})}).toThrow();
  expect(() => {CM.getFormat(function testFunc() {})}).toThrow();
  expect(() => {CM.getFormat(null)}).toThrow();
  expect(() => {CM.getFormat(undefined)}).toThrow();
  expect(() => {CM.getFormat(NaN)}).toThrow();
  expect(() => {CM.getFormat('')}).toThrow();
  expect(() => {CM.getFormat('non-existent-channel')}).toThrow();

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

  expect(() => {CM.setFormat()}).toThrow();
  expect(() => {CM.setFormat('ANY', 'non-existent-channel')}).toThrow();
  expect(() => {CM.setFormat('wrong-string', 'test-channel')}).toThrow();
  expect(() => {CM.setFormat(1, 'test-channel')}).toThrow();
  expect(() => {CM.setFormat(true, 'test-channel')}).toThrow();
  expect(() => {CM.setFormat([1,2,3], 'test-channel')}).toThrow();
  expect(() => {CM.setFormat({}, 'test-channel')}).toThrow();
  expect(() => {CM.setFormat(function testFunc() {}, 'test-channel')}).toThrow();
  expect(() => {CM.setFormat(null, 'test-channel')}).toThrow();
  expect(() => {CM.setFormat(undefined, 'test-channel')}).toThrow();
  expect(() => {CM.setFormat(NaN, 'test-channel')}).toThrow();

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

  expect(() => {CM.setFormat('test-channel', invalidFormat)}).toThrow();
})

