"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const param_type_1 = require("param-type");
const toString = Object.toString;
/**
 * @name paramsEqual
 * @author kmdrGroch
 * @requires param-type
 * @param { any } a
 * @param { any } b
 * @returns { boolean } true if variables are strictly equal
 */
function paramsEqual(a, b) {
    /* Check for same types */
    if (param_type_1.default(a) !== param_type_1.default(b))
        return false;
    /* Check primitives and object-primitives */
    if (["boolean", "string", "number", "date", "regexp", "symbol"].indexOf(param_type_1.default(a)) > -1)
        return String(a) === String(b);
    /* Check functions */
    if (typeof a === "function")
        return toString.call(a) === toString.call(b);
    /* Check objects */
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (const k in a) {
        const propsA = Object.getOwnPropertyDescriptor(a, k) || {};
        const propsB = Object.getOwnPropertyDescriptor(b, k) || {};
        if (a[k] === a)
            throw new RangeError("You are not allowed to create infinite nest");
        if (!paramsEqual(propsA.set, propsB.set) || !paramsEqual(propsA.get, propsB.get))
            return false;
        if (!b.hasOwnProperty(k) || !paramsEqual(a[k], b[k]))
            return false;
        delete a[k];
        delete b[k];
    }
    return Object.keys(b).length === 0;
}
exports.default = paramsEqual;
//# sourceMappingURL=paramsEqual.js.map