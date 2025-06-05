const fs = require("node:fs");
const path = require("node:path")

// read file synchronously -----------------------------------------------------------
const r = fs.readFileSync("read.txt", "utf8", (err) => { // not necessary to give this callback
  console.log(err);
});
console.log("Data (sync): ", r); // Read

// read file asynchronously
const r2 = fs.readFile("./read.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Data (async): ", data); // Read
});
console.log("This will print before async file read");

// write file synchronously -----------------------------------------------------------
const w = fs.writeFileSync("write.txt", "Written");
console.log(w); // undefined

// write file asynchronously
const w2 = fs.writeFile("./write.txt", "New data", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Data written asynchronously");
});

// watch file ------------------------------------------------------------------------
// unreliable and may show multiple events for every modification
const watcher = fs.watch("watch.txt", (eventType, filename) => {
  console.log(filename, "was modified");
  console.log("The type of change was:", eventType);
});

// Renaming the file to a new name
fs.renameSync("watch.txt", "new-watch.txt"); // rename

// Renaming the file back to its old name
fs.renameSync("new-watch.txt", "watch.txt"); // rename

// Changing the contents of the file
fs.writeFileSync("watch.txt", "Some more data"); // change

// close the watcher (stop watching for changes)
setTimeout(() => watcher.close(), 1000); // if closed immediately, it doesn't work

// watch.txt was modified
// The type of change was: rename
// watch.txt was modified
// The type of change was: rename
// watch.txt was modified
// The type of change was: change
// watch.txt was modified
// The type of change was: change
// watch.txt was modified
// The type of change was: change


// append file ----------------------------------------------------------------------
console.log("Data before: ", fs.readFileSync("append.txt", "utf8")); // Data before:  Some data
fs.appendFileSync("append.txt", " Some more data");
console.log("Data after: ", fs.readFileSync("append.txt", "utf8")); // Data after:  Some data Some more data

// path -----------------------------------------------------------------------------

// join
const fp1 = path.join('folder', 'subfolder', 'file.txt');
console.log(fp1); // folder\subfolder\file.txt

// resolve - gives absolute path
const absolutePath = path.resolve('folder', 'somefile.txt');
console.log(absolutePath); // C:\Users\AryanBakliwal\Desktop\NodeJS\Day 2\File System\folder\somefile.txt

// extension
const ext = path.extname('package.json');
console.log(ext); // .json

// parse - break into parts
const parsed = path.parse('/folder/subfolder/file.txt');
console.log(parsed);
/*
{
    root: '/',
    dir: '/folder/subfolder',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
}
*/