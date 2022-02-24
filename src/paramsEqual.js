"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const param_type_1 = require("param-type");
const toString = Object.toString;
/**
 * @author kmdrGroch
 * @returns If variables are strictly equal
 */
const paramsEqual = (a, b) => {
    /* Check for same types */
    if ((0, param_type_1.default)(a) !== (0, param_type_1.default)(b)) {
        return false;
    }
    /* Check primitives and object-primitives */
    if (typeof a === 'number') {
        return Object.is(a, b);
    }
    if (['boolean', 'string', 'date', 'regexp', 'symbol'].indexOf((0, param_type_1.default)(a)) > -1) {
        return String(a) === String(b);
    }
    /* Check functions */
    if (typeof a === 'function') {
        return toString.call(a) === toString.call(b);
    }
    /* Check objects */
    if (a === b) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (const k of keysA) {
        if (a[k] === a) {
            throw new RangeError('You are not allowed to create infinite nest');
        }
        const propsA = Object.getOwnPropertyDescriptor(a, k) || {};
        const propsB = Object.getOwnPropertyDescriptor(b, k) || {};
        if (!paramsEqual(propsA.set, propsB.set) || !paramsEqual(propsA.get, propsB.get)) {
            return false;
        }
        if (!b.hasOwnProperty(k) || !paramsEqual(a[k], b[k])) {
            return false;
        }
    }
    return true;
};
exports.default = paramsEqual;
//# sourceMappingURL=paramsEqual.js.map