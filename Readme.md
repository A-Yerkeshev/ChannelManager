# Channel Manager Readme

Channel Manager is a JavaScript module, aimed to provide a standardized way of communication between different modules of the app. It suits apps that are build using **Pub-Sub** pattern.

![graph](./graph.png)

## Why it is useful?

When developing an app that consists of several modules, one problem that might arise is that modules become too "dependent" on each other's code. For example, if you change function's name in one module, you will also need to change that name in all modules that imported that function from initial module. The problem even worsens, when multiple developers are working on the same app.

By using Pub-Sub design pattern in Channel Manager, components become more independent from each other, as one module does not need to know anything about other modules. Module just sends a request through pre-agreed channel and waits for the response.

## How it works?

**1. Download ChannelManager.js**

For this example let's call the module that sends data **sender.js** and component that receives the data - **receiver.js**. That's what we need to do to setup our data channel:

### In sender.js:

```
  import CM from <file-location> // --In browser
  const CM = require(<file-location>) // --In Node

  CM.open('channel-name');
  CM.send('channel-name', <your-data>);
```
### In receiver.js:

```
  import CM from <file-location> // --In browser
  const CM = require(<file-location>) // --In Node

  CM.listen('channel-name', (data) => {
    console.log('Doing something with data');
  })
```
Now, every time `sender.js` sends new data, the callback that was passed to `.listen()` function is going to be triggered.

**And that's it!** That's all you need to start working with Channel Manager. Now you can connect new modules to your channel and all you have to do is to repeat the steps above.

*Note that you do not need to run `.openChannel()` function if you send data to existing channel.

## Methods

* `ChannelManager.open( <channel-name:string> ) ==> channel object`\
Opens new channel. This function only needs to be run in first module. Has no effect when called again with same argument.

* `ChannelManager.exists( <channel-name:string> ) ==> boolean`\
Checks if channel with given name already exists.

* `ChannelManager.send( <channel-name:string>, <data>, <?data-headers:object>, <?filter:keyword | object>, <?callback:function>) ==> array`\
Sends data to the channel. Return value is the array of results from all callbacks that were listening to this channel.\
`data-headers` - optional object with data that might be used by receiver module;\
`filter` - used to filter results array by given data type/object format. See [format](#format) for possible values;\
`callback` - optional function that will be passed results array as argument. Use when response from listening modules is asynchronous.

**Example:**
```
  const data = ['Lion', 'Wolf', 'Moose'];

  const headers = {
    type: 'animals',
    domesticated: false,
    predators: 2,
    herbivorous: 1
  }

  const filter = 'STRING';

  const transport = CM.send('zoo', headers, filter)[0];
```

* `ChannelManager.listen( <channel-name:string>, <callback1:function>, ...<callbackN:function> )`\
Specifies, which callbacks need to be run when new data is sent to the channel. Each callback function will receive a `data` argument and `data-headers` object as second optional argument.
**Example:**
```
  const callback = (data, headers) => {
    if (headers.predators > 0 && headers.herbivorous > 0) {
      return 'Should be transported separately';
    } else {
      return 'Can be transported together';
    }
  }

  CM.listen('zoo', callback);
```

* `ChannelManager.listenOnce( <channel-name:string>, <callback1:function>, ...<callbackN:function> )`\
Works same way as `.listen()` method, but callbacks fire only once.

* `ChannelManager.unlisten( <channel-name:string>, <callback1:function>, ...<callbackN:function> )`\
Stops specified functions from listening to the channel.

* `ChannelManager.closeChannel( <channel-name:string> )`\
 Closes the data channel.

### Format

Format can be either a keyword, either object. Keyword can be:
`'ANY'`,
`'STRING'`,
`'NUMBER'`,
`'BOOLEAN'`,
`'UNDEFINED'`,
`'ARRAY'`,
`'OBJECT'`,
`'FUNCTION'`,
`'BIGINT'`

 Data format can be an object with properties that must be present in data object. Like so:
 ```
 {
  width: 'NUMBER',
  height: 'NUMBER',
  color: 'STRING'
 }
 ```
