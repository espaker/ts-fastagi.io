# fastagi.io

## Asterisk fastAGI: An Express-like AGI interface

`fastagi.io` is build on top of the great `asterisk.io` library and provides an Express-like feel to writing AGI's for asterisk.  If you are used to using node Express then you'll find fastagi.io really familiar.  All AGI methods are promise-based so no callback hell.

Example:

`server.js`
```
require('dotenv').config();
const fastagi = require("fastagi.io");
const demo1Agi = require('./demo1.js');

const PORT = process.env.PORT || 4573;

// Create the AGI server
const app = fastagi();

// Add as many endpoints as you need 
app.agi("/demo1", demo1Agi);


// Start the server
app.listen(PORT, () => {
  console.log(`FastAGI listening on port ${PORT}`);
});
```

`demo1Agi.js`
```
const demoAgi = (channel) => {

  // These 3  are optional, often not needed
  channel.on('hangup', function() {
    console.log('channel hangup');
  });

  channel.on('close', function() {
    console.log('channel closed');
  });

  channel.on('error', function(err) {
    console.log('error!', err);
  });


  // url params are inside the channel object
  const params = channel.params;

  channel.get("count")    // Get channel variable "count"
    .then(res => {
      return channel.exec('Say Date "1754330073" ""');  // Play something
    })
    .then(() => {
      channel.set("STATUS", 100);   // Set channel variable "STATUS"
    })
    .then(() => {
      channel.close();              // return control back to dialplan
    });
};

module.exports = demoAgi;
```
`extensions.conf`
```
[demo1] ; Demo
exten  = s,1, NoOp()
  same = n, Answer()
  same = n, Set(count=199)
  same = n, AGI(agi://localhost/demo1?param1=123&param2=456)
  same = n, Verbose(2, STATUS=${STATUS}, CODE=${CODE}})
  same = n, hangup();
```