const handleSuccess = (res, code, data) => {
    return res.status(code).send(data)
}

const handleFailure = (res, code, data) => {
    return res.status(code).send(data);
}

module.exports = {handleSuccess, handleFailure}