'use strict';

var { Base64 } = require('js-base64');
var { JsonBase64, encode, decode } = require('./index.js');

describe('JsonBase64', () => {
    test('proper exports', () => {
        expect(JsonBase64.encode).toEqual(encode);
        expect(JsonBase64.decode).toEqual(decode);
    });

    test('encodes object', () => {
        var obj = { foo: 'bar', a: 1 };
        var encoded = encode(obj, { urlSafe: false });
        console.log(encoded);
        expect(encoded).toEqual('eyJmb28iOiJiYXIiLCJhIjoxfQ==');

        var jsonstring = Base64.decode(encoded);
        expect(jsonstring).toEqual('{"foo":"bar","a":1}');
    });

    test('decodes object', () => {
        var b64 = 'eyJmb28iOiJiYXIiLCJhIjoxfQ==';
        var decoded = decode(b64, { urlSafe: false });

        expect(decoded).toEqual({ foo: 'bar', a: 1 });
    });

    test('url-safe encoding', () => {
        var str = String.fromCharCode(255);
        var encoded = encode(str);
        expect(encoded).toEqual('IsO_Ig--');
        
        var str = String.fromCharCode(254);
        var encoded = encode(str);
        expect(encoded).toEqual('IsO.Ig--');
    });
    
    test('url-safe decoding', () => {
        var decoded = decode('IsO_Ig--');
        expect(decoded).toEqual(String.fromCharCode(255));
        
        var decoded = decode('IsO.Ig--');
        expect(decoded).toEqual(String.fromCharCode(254));
    });

    test('url-safe encode and decode', () => {
        var obj = { foo: 'bar', a: 1 };
        var encoded = encode(obj);
        var decoded = decode(encoded);
        expect(decoded).toEqual(obj);
    });
});
