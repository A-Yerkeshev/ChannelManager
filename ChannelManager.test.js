"use strict";

const CM = require('./ChannelManager.js');

beforeEach(() => {
  CM.open('test-channel');
})

afterEach(() => {
  CM.close('test-channel');
})

test("Validate input for .open()", () => {
  expect(() => {CM.open()}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open(2)}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open(true)}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open([1,2,3])}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open({})}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open(function testFunc() {})}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open(null)}).toThrow("Argument passed to .open() function must be of 'string' type.");
  expect(() => {CM.open(undefined)}).toThrow("Argument passed to .open() function must be of 'string' type.");

  expect(() => {CM.open('')}).toThrow("Argument passed to .open() cannot be empty string.");
})

test("Validate input for .exists()", () => {
  expect(() => {CM.exists()}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(2)}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(true)}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists([1,2,3])}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists({})}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(function testFunc() {})}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(null)}).toThrow("Argument passed to .exists() function must be of 'string' type.");
  expect(() => {CM.exists(undefined)}).toThrow("Argument passed to .exists() function must be of 'string' type.");

  expect(() => {CM.exists('')}).toThrow("Argument passed to .exists() cannot be empty string.");
})

test("Confirm that opened channel exists", () => {
  expect(CM.exists('test-channel')).toBe(true);
})

test("Confirm that non-opened channel does not exist", () => {
  expect(CM.exists('non-existent-channel')).toBe(false);
})

test("Validate input for .close()", () => {
  expect(() => {CM.close()}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close(2)}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close(true)}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close([1,2,3])}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close({})}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close(function testFunc() {})}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close(null)}).toThrow("Argument passed to .close() function must be of 'string' type.");
  expect(() => {CM.close(undefined)}).toThrow("Argument passed to .close() function must be of 'string' type.");

  expect(() => {CM.close('')}).toThrow("Argument passed to .close() cannot be empty string.");
  expect(() => {CM.close('non-existent-channel')}).toThrow("Channel with name 'non-existent-channel' does not exist.");
})

test("Confirm that closed channel does not exist", () => {
  CM.close('test-channel');
  expect(CM.exists('test-channel')).toBe(false);
  CM.open('test-channel');
})

test("Validate input for .send()", () => {
  expect(() => {CM.send()}).toThrow(".send() function expects at least 2 arguments: channel name and data.");
  expect(() => {CM.send(1)}).toThrow(".send() function expects at least 2 arguments: channel name and data.");

  const data = [1, 2, 3];
  const headers = {object: 'box'};
  const filter = 'STRING';
  const callback = jest.fn();

  expect(() => {CM.send(2, data)}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(true, data)}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send([1,2,3], data)}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send({}, data)}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(function testFunc() {}, data)}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(null, data)}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(undefined, data)}).toThrow("Argument passed to .send() function must be of 'string' type.");

  expect(() => {CM.send('test-channel', data, 'string')}).toThrow("Data headers argument passed to .send() function must be an object.");
  expect(() => {CM.send('test-channel', data, 1)}).toThrow("Data headers argument passed to .send() function must be an object.");
  expect(() => {CM.send('test-channel', data, true)}).toThrow("Data headers argument passed to .send() function must be an object.");
  expect(() => {CM.send('test-channel', data, [1,2,3])}).toThrow("Data headers argument passed to .send() function must be an object.");
  expect(() => {CM.send('test-channel', data, function testFunc() {})}).toThrow("Data headers argument passed to .send() function must be an object.");
  expect(() => {CM.send('test-channel', data, null)}).toThrow("Data headers argument passed to .send() function must be an object.");

  expect(() => {CM.send('test-channel', data, headers, 'string')}).toThrow("Fi")
})

test("Send data", () => {
  const callback1 = () => 1;
  const callback2 = () => 2;

  CM.listen('test-channel', callback1);
  CM.listenOnce('test-channel', callback2);




  // CM.setFormat('test-channel', 'NUMBER');
  // expect(CM.send('test-channel', 1000)).toBe(undefined);

  // expect(() => {CM.send('test-channel', 'data')}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  // expect(() => {CM.send('test-channel', false)}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  // expect(() => {CM.send('test-channel', [1,2,3])}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  // expect(() => {CM.send('test-channel', {})}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  // expect(() => {CM.send('test-channel', function testFunc() {})}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  // expect(() => {CM.send('test-channel', null)}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
  // expect(() => {CM.send('test-channel', undefined)}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");

  // const format = {
  //   width: 'NUMBER',
  //   length: 'NUMBER',
  //   color: 'STRING'
  // }

  // const validData = {
  //   width: 15,
  //   length: 25,
  //   color: 'red'
  // }

  // const invalidData = {
  //   width: '1001',
  //   length: false
  // }

  // CM.setFormat('test-channel', format);
  // expect(() => {CM.send('test-channel', invalidData)}).toThrow("Data passed to .send() function does not match data format for 'test-channel' channel. Run .getFormat('test-channel') to check the data format.");
})

test("Validate data on .send()", () => {
  CM.open('test-channel');

  expect(() => {CM.send()}).toThrow(".send() function expects at least 2 arguments: channel name and data.");
  expect(() => {CM.send('', 'data')}).toThrow("Argument passed to .send() cannot be empty string.");
  expect(() => {CM.send('non-existent-channel', 'data')}).toThrow("Channel with name 'non-existent-channel' does not exist.");

  expect(() => {CM.send(1, 'data')}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(false, 'data')}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send([1,2,3], 'data')}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send({}, 'data')}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(function testFunc() {}, 'string')}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(null, 'data')}).toThrow("Argument passed to .send() function must be of 'string' type.");
  expect(() => {CM.send(undefined, 'data')}).toThrow("Argument passed to .send() function must be of 'string' type.");

  CM.close('test-channel');
})

test("Listen", () => {
  CM.open('test-channel');

  expect(() => {CM.listen()}).toThrow(".listen() function expects at least 2 arguments: channel name and callback.");
  expect(() => {CM.listen('non-existent-channel', function callback1() {})}).toThrow("Channel with name 'non-existent-channel' does not exist.");
  expect(() => {CM.listen('', function callback1() {})}).toThrow("Argument passed to .listen() cannot be empty string.");

  expect(() => {CM.listen(1, function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");
  expect(() => {CM.listen(true, function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");
  expect(() => {CM.listen([1,2,3], function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");
  expect(() => {CM.listen({}, function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");
  expect(() => {CM.listen(function testFunc() {}, function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");
  expect(() => {CM.listen(null, function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");
  expect(() => {CM.listen(undefined, function callback1() {})}).toThrow("Argument passed to .listen() function must be of 'string' type.");

  expect(() => {CM.listen('test-channel', 'string')}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', 2)}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', false)}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', [1,2,3])}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', {})}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', null)}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', undefined)}).toThrow("Argument passed to .listen() function must be of 'function' type.");
  expect(() => {CM.listen('test-channel', function callback1() {}, 3)}).toThrow("Argument passed to .listen() function must be of 'function' type.");

  const data = {
    value: true
  }
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  const callback3 = jest.fn();

  CM.listen('test-channel', callback1);
  CM.send('test-channel', data);

  CM.listen('test-channel', callback1, callback2, callback3);
  CM.send('test-channel', data);

  expect(callback1).toHaveBeenCalledTimes(2);
  expect(callback2).toHaveBeenCalled();
  expect(callback3).toHaveBeenCalled();

  CM.close('test-channel');
})

test("Listen once", () => {
  CM.open('test-channel');

  expect(() => {CM.listenOnce()}).toThrow(".listenOnce() function expects at least 2 arguments: channel name and callback.");
  expect(() => {CM.listenOnce('non-existent-channel', function callback1() {})}).toThrow("Channel with name 'non-existent-channel' does not exist.");
  expect(() => {CM.listenOnce('', function callback1() {})}).toThrow("Argument passed to .listenOnce() cannot be empty string.");

  expect(() => {CM.listenOnce(1, function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");
  expect(() => {CM.listenOnce(true, function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");
  expect(() => {CM.listenOnce([1,2,3], function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");
  expect(() => {CM.listenOnce({}, function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");
  expect(() => {CM.listenOnce(function testFunc() {}, function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");
  expect(() => {CM.listenOnce(null, function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");
  expect(() => {CM.listenOnce(undefined, function callback1() {})}).toThrow("Argument passed to .listenOnce() function must be of 'string' type.");

  expect(() => {CM.listenOnce('test-channel', 'string')}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', 2)}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', false)}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', [1,2,3])}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', {})}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', null)}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', undefined)}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");
  expect(() => {CM.listenOnce('test-channel', function callback1() {}, 3)}).toThrow("Argument passed to .listenOnce() function must be of 'function' type.");

  const data = {
    value: true
  }
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  const callback3 = jest.fn();

  CM.listenOnce('test-channel', callback1);
  CM.send('test-channel', data);
  CM.send('test-channel', data);

  expect(callback1).toHaveBeenCalledTimes(1);

  CM.listenOnce('test-channel', callback2, callback3);
  CM.send('test-channel', data);
  CM.send('test-channel', data);

  expect(callback2).toHaveBeenCalledTimes(1);
  expect(callback3).toHaveBeenCalledTimes(1);

  CM.close('test-channel');
})

test("Unlisten", () => {
  CM.open('test-channel');

  expect(() => {CM.unlisten()}).toThrow(".unlisten() function expects at least 2 arguments: channel name and callback.");
  expect(() => {CM.unlisten('non-existent-channel', function callback1() {})}).toThrow("Channel with name 'non-existent-channel' does not exist.");
  expect(() => {CM.unlisten('', function callback1() {})}).toThrow("Argument passed to .unlisten() cannot be empty string.");

  expect(() => {CM.unlisten(1, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");
  expect(() => {CM.unlisten(true, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");
  expect(() => {CM.unlisten([1,2,3], function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");
  expect(() => {CM.unlisten({}, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");
  expect(() => {CM.unlisten(function testFunc() {}, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");
  expect(() => {CM.unlisten(null, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");
  expect(() => {CM.unlisten(undefined, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'string' type.");

  expect(() => {CM.unlisten('test-channel', 'string')}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', 2)}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', false)}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', [1,2,3])}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', {})}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', null)}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', undefined)}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");
  expect(() => {CM.unlisten('test-channel', 3, function callback1() {})}).toThrow("Argument passed to .unlisten() function must be of 'function' type.");

  const data = {
    value: true
  }
  const callback1 = jest.fn();

  CM.listen('test-channel', callback1);
  CM.unlisten('test-channel', callback1);
  CM.send('test-channel', data);

  expect(callback1).not.toHaveBeenCalled();

  CM.close('test-channel');
})

// test("Request", () => {
//   CM.open('req-channel');
//   CM.open('res-channel');

//   CM.listen('req-channel', () => {
//     CM.send('res-channel', true);
//   })

//   expect(() => {CM.request()}).toThrow(".request() function expects 2 arguments: request channel name and response channel name.");
//   expect(() => {CM.request('non-existent-channel')}).toThrow(".request() function expects 2 arguments: request channel name and response channel name.");
//   expect(() => {CM.request('non-existent-channel', 'res-channel')}).toThrow("Channel with name 'non-existent-channel' does not exist.");
//   expect(() => {CM.request('', 'res-channel')}).toThrow("Argument passed to .request() cannot be empty string.");
//   expect(() => {CM.request('req-channel', '')}).toThrow("Argument passed to .request() cannot be empty string.");

//   expect(() => {CM.request(1, 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request(true, 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request([1,2,3], 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request({}, 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request(function testFunc() {}, 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request(null, 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request(undefined, 'res-channel')}).toThrow("Argument passed to .request() function must be of 'string' type.");

//   expect(() => {CM.request('req-channel', 1)}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request('req-channel', true)}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request('req-channel', [1,2,3])}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request('req-channel', {})}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request('req-channel', function testFunc() {})}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request('req-channel', null)}).toThrow("Argument passed to .request() function must be of 'string' type.");
//   expect(() => {CM.request('req-channel', undefined)}).toThrow("Argument passed to .request() function must be of 'string' type.");

//   const response = CM.request('req-channel', 'res-channel');
//   expect(response).toBe(true);

//   CM.close('req-channel');
//   CM.close('res-channel');
// })

// test("Get Format", () => {
//   CM.open('test-channel');

//   expect(() => {CM.getFormat()}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat(2)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat(true)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat([1,2,3])}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat({})}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat(function testFunc() {})}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat(null)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat(undefined)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat(NaN)}).toThrow("Argument passed to .getFormat() function must be of 'string' type.");
//   expect(() => {CM.getFormat('')}).toThrow("Argument passed to .getFormat() cannot be empty string.");
//   expect(() => {CM.getFormat('non-existent-channel')}).toThrow("Channel with name 'non-existent-channel' does not exist.");

//   expect(CM.getFormat('test-channel')).toBe('ANY');

//   const format = {
//     width: 'NUMBER',
//     height: 'NUMBER',
//     color: 'STRING'
//   }

//   CM.setFormat('test-channel', format);
//   expect(CM.getFormat('test-channel')).toBe(format);

//   CM.close('test-channel');
// })

// test("Set format", () => {
//   CM.open('test-channel');

//   expect(() => {CM.setFormat()}).toThrow(".setFormat() function expects 2 arguments: channel name and data format.");
//   expect(() => {CM.setFormat('non-existent-channel', 'ANY')}).toThrow("Channel with name 'non-existent-channel' does not exist.");
//   expect(() => {CM.setFormat('', 'ANY')}).toThrow("Argument passed to .setFormat() cannot be empty string.");

//   expect(() => {CM.setFormat(1, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
//   expect(() => {CM.setFormat(true, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
//   expect(() => {CM.setFormat([1,2,3], 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
//   expect(() => {CM.setFormat({}, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
//   expect(() => {CM.setFormat(function testFunc() {}, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
//   expect(() => {CM.setFormat(null, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");
//   expect(() => {CM.setFormat(undefined, 'ANY')}).toThrow("Argument passed to .setFormat() function must be of 'string' type.");

//   expect(() => {CM.setFormat('test-channel', 'wrong-string')}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
//   expect(() => {CM.setFormat('test-channel', 1)}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
//   expect(() => {CM.setFormat('test-channel', true)}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
//   expect(() => {CM.setFormat('test-channel', [1,2,3])}).toThrow("Format object passed to .setFormat() cannot be array.");
//   expect(() => {CM.setFormat('test-channel', {})}).toThrow("Format object passed to .setFormat() cannot be empty.");
//   expect(() => {CM.setFormat('test-channel', function testFunc() {})}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");
//   expect(() => {CM.setFormat('test-channel', null)}).toThrow("Format object passed to .setFormat() cannot be null.");
//   expect(() => {CM.setFormat('test-channel', undefined)}).toThrow("Format passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword or object.");

//   CM.setFormat('test-channel', 'STRING');
//   expect(CM.getFormat('test-channel')).toBe('STRING');

//   const format = {
//     width: 'NUMBER',
//     height: 'NUMBER',
//     color: 'STRING'
//   }

//   CM.setFormat('test-channel', format);
//   expect(CM.getFormat('test-channel')).toBe(format);

//   const invalidFormat = {
//     width: 589
//   }

//   expect(() => {CM.setFormat('test-channel', invalidFormat)}).toThrow("Values of format object, passed to .setFormat() function must be 'ANY', 'STRING', 'NUMBER', 'BOOLEAN', 'UNDEFINED', 'ARRAY', 'OBJECT', 'FUNCTION', 'BIGINT' keyword.");

//   CM.close('test-channel');
// })
