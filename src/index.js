'use strict';
const { Base64 } = require('js-base64');
const transliterate = require('./transliterate');

const encodeJsonB64 = (obj, options = {}) => {
    let { urlSafe = true, shouldThrow = false } = options;
    let encoded = '';
    try {
        encoded = Base64.encode(JSON.stringify(obj));
        if (urlSafe) {
            encoded = transliterate(encoded, '+/=', '._-');
        }
    }
    catch (e) {
        if (shouldThrow) {
            throw e;
        }
    }

    return encoded;
}

const decodeJsonB64 = (str, options = {}) => {
    let { urlSafe = true, shouldThrow = false } = options;
    
    let decoded = {};
    try {
        if (urlSafe) {
            str = transliterate(str, '._-', '+/=')
        }
        decoded = JSON.parse(Base64.decode(str));
    }
    catch (e) {
        if (shouldThrow) {
            throw e;
        }
    }

    return decoded;
}

const JsonBase64 = {
    encode: encodeJsonB64,
    decode: decodeJsonB64
};

module.exports = {
    JsonBase64,
    ...JsonBase64
};
