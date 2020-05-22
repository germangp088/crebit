const httpError = (customMessage, code) => {
    const err = new Error(customMessage);
    err.code = code;
    err.description = customMessage
    return err;
}

module.exports = {
    httpError
}