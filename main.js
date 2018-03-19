'use strict';
function _checkTypeProp(type, prop){
    try {
        return type[prop]
    } catch(e) {
        return false
    }
}
function checkType(variable, type, checkProto = true){
    if (variable === null || type === null) return type === variable;
    else if (
        type === variable ||
        (
            _checkTypeProp(type, 'name') &&
            type.name.toLowerCase &&
            type.name.toLowerCase.apply &&
            ((typeof variable)[0].toUpperCase() + (typeof variable).slice(1)) == type.name
        ) ||
        (
            _checkTypeProp(type, 'isPrototypeOf') &&
            type.isPrototypeOf.apply &&
            type.isPrototypeOf(variable)
        ) || (
            (_checkTypeProp(type, 'prototype') || _checkTypeProp(type, '__proto__')) &&
            checkProto &&
            checkType(variable, type.prototype || type.__proto__.constructor, false)
        )
    ) return true; else return false;
}
module.exports = checkType
