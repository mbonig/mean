'use strict';

/**
 * Replaces tokens like %username% with the value off of the given object
 * @param tokenizedString - 'welcome to screening-room %username%'
 * @param object - {username:'super.user'}
 */
module.exports.process = function (tokenizedString, object) {
    return tokenizedString
        .replace('%username%', object.username)
        .replace('%firstname%', object.firstname)
        .replace('%lastname%', object.lastname)
        .replace('%email%', object.email)
        .replace('%password%', object.password);
};
