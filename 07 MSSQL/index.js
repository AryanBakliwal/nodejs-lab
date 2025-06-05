const connectToMSSQL = require("./db-connect.js"); // when we do this, the db-connect.js file is executed
const User = require("./user-model.js");

console.log("Hello") // prints before Connected

// var Request = require('tedious').Request;  

// async 
// function getData() {  
//     var request = new Request("SELECT * FROM users;", function(err) {  
//     if (err) {  
//         console.log(err);}  
//     });  
//     var result = "";  
//     request.on('row', (columns) => { columns.forEach((column) => {  
//           if (column.value === null) {  
//             console.log('NULL');  
//           } else {  
//             result+= column.value + " ";  
//           }  
//         });  
//         console.log(result);  
//         result ="";  
//     });  

//     request.on('done', function(rowCount, more) {  
//     console.log(rowCount + ' rows returned');  
//     });
// }
// getData();

// // async 

// var Request = require('tedious').Request; 
// function insertData(connection, name, email) {
//     var request = new Request("INSERT INTO users (name, email) VALUES (@Name, @Email);", function(err) {
//     if (err) {
//         console.log(err);}
//     });
//     request.addParameter('Name', TYPES.NVarChar,name);
//     request.addParameter('Email', TYPES.NVarChar , email);
    
//     request.on('row', function(columns) {
//         columns.forEach(function(column) {
//             if (column.value === null) {
//                 console.log('NULL');
//             } else {
//                 console.log("id of inserted user is " + column.value);
//             }
//         });
//     });

//     // Close the connection after the final event emitted by the request, after the callback passes
//     // request.on("requestCompleted", function (rowCount, more) {
//     //     connection.close();
//     // });
//     connection.execSql(request);
// }
// insertData(con, "Aryan", "aryan@test.com")

// we cannot directly do this because we are using require
// To do like this, use import and type: module
// const connection = await connectToMSSQL();
// await executeStatement(connection);

// (async () => {
//     try {
//         const connection = await connectToMSSQL();
//         await getData(connection);
//         // await insertData(connection, 'Jake', 'jake@example.com')
//     } catch (error) {
//         console.log(error)
//     }
// })();

async function createUser(name, email) {
    try {
        const user = await User.create({name: name, email: email})
        console.log("Tim's auto-generated ID: ", user.id);
    } catch (error) {
        console.log(error);
    }
    
    // getData();
}

createUser('Tim', 'tim@example.com');
