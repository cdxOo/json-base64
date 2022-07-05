'use strict';

// this is a simplified version kinda equivalent to perl "tr///d"
const transliterate = (str, search, replace = '') => {
    var strChars = [ ...str ];
    var out = [ ...str ];
    
    for (let [ is, stringChar ] of strChars.entries()) {
        for (let [ ic, searchChar ] of [ ...search ].entries()) {
            if (stringChar === searchChar) {
                out[is] = replace.charAt(ic) || '';
                break;
            }
        }
    }

    return out.join('');
}

module.exports = transliterate;
