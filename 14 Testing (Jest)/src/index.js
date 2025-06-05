require('dotenv').config({path: './src/config/env/.env'});

function sum(a, b) {
    return a+b;
}

const fetchFun = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Resolved');
        }, 2000);
    });
}

fetchFun();


module.exports = {sum, fetchFun};