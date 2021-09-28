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
});

test("Check if channel exists", () => {
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
  expect(CM.exists('non-existent-channel')).toBe(false);
})

test("Close channel", () => {
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
  CM.closeChannel('test-channel')

  expect(CM.exists('test-channel')).toBe(false);
  expect(() => {CM.closeChannel('non-existent-channel')}).toThrow();
})

