const validate = async function (decoded, request) {
    const session = await request.getModel('sessions').findById(decoded.session_id);

    if (session) {
        return { isValid: true };
    } else {
        return { isValid: false };
    }
}

const auth = {
    key: process.env.APP_KEY || 'asdf',
    validate: validate,
    verifyOptions: { algorithms: ['HS256'] }
}

module.exports = auth;