// modules 

// In package.json, we define the type: <module/commonjs (default)> how we want to deal with modules
// If type is not specified, modules are treated as CommonJS modules, if type: module, they are treated as ES Modules

// const {greetCommon} = require('./modules/common.cjs') // doesn't work when type: module in package.json
// const { greetECMS } = require('./modules/ecma.mjs') // we can use this even if it is mjs and type: commonjs in package.json
import { greetCommon } from './modules/common.cjs' // we can use this even if it is cjs and type: module in package.json
import { greetECMS as greetES } from './modules/ecma.mjs' // doesn't work when type: commonjs in package.json

import('./modules/async.js') // asynchronous import
.then((module) => {
    console.log("Async module loaded")
    module.greetAsync() 
})
.catch((err) => console.error(err));

greetCommon()
greetES()
console.log("synchronous");

// From CommonJS module
// From ES module
// synchronous
// Async module loaded
// From asynchronous import

// global object ----------------------------------------------------------------------

console.log(global);
{/* <ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter]
} */}

function x() {
    console.log("Called by globalThis");
    
}
console.log(globalThis.x); 

// undefined because in Node.js, top-level things are not attached to globalThis


