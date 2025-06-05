const Connection = require('tedious').Connection;

var config = {
    server: process.env.MSSQL_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.MSSQL_USERNAME,
            password: process.env.MSSQL_PASSWORD
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        database: process.env.MSSQL_DATABASE
    }
};  

// var connection = new Connection(config);  

// connection.on('connect', function(err) {  
//     if(err) {
//         console.log(err);
//     } else console.log("Connected");
// });

// // can't use await because it doesn't return a promise
// // actually, it doesn't return anything
// connection.connect();

// make is connecting to MSSQL asynchronous and return a promise
async function connectToMSSQL() {
    return new Promise((resolve, reject) => {
        const connection = new Connection(config);  

        connection.on('connect', function(err) {  
            if(err) {
                console.log(err);
                reject(err)
            } else {
                console.log("Connected");
                resolve(connection);
            }
        });

        connection.connect();
    })
}

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MSSQL_DATABASE, process.env.MSSQL_USERNAME, process.env.MSSQL_PASSWORD, {
    host: process.env.MSSQL_SERVER,
    dialect: 'mssql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
        console.error('Unable to connect to the database:', error);
})

// module.exports = {/*connectToMSSQL, */sequelize}; // export connection
module.exports = sequelize;