const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hashPassword = (plainPass) => {
    return bcrypt.hashSync(plainPass, salt);
}

const comparePassword = (plainPass, hashedPass) => {

    if(bcrypt.compareSync(plainPass, hashedPass)) {
        return true;
    }
    return false;
}

module.exports = {hashPassword, comparePassword};