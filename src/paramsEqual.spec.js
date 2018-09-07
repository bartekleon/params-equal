"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
require("jasmine");
const paramsEqual_1 = require("./paramsEqual");
describe("paramsEqual", () => {
    it("should work for NaN", () => {
        expect(paramsEqual_1.default(NaN, NaN)).toBeTruthy();
    });
    it("should work for null", () => {
        expect(paramsEqual_1.default(null, null)).toBeTruthy();
    });
    it("should work for booleans", () => {
        expect(paramsEqual_1.default(true, true)).toBeTruthy();
        expect(paramsEqual_1.default(true, false)).toBeFalsy();
    });
    it("should work for strings", () => {
        expect(paramsEqual_1.default("", "")).toBeTruthy();
        expect(paramsEqual_1.default("", "hi")).toBeFalsy();
    });
    it("should work for numbers", () => {
        expect(paramsEqual_1.default(2, 2)).toBeTruthy();
        expect(paramsEqual_1.default(2, 4)).toBeFalsy();
    });
    it("should work for regexp", () => {
        expect(paramsEqual_1.default(/a/g, /a/g)).toBeTruthy();
        expect(paramsEqual_1.default(/a/u, /a/g)).toBeFalsy();
        expect(paramsEqual_1.default(/b/g, /a/g)).toBeFalsy();
        expect(paramsEqual_1.default(/a/g, new RegExp('a', 'g'))).toBeTruthy();
    });
    it("should work for `new` elements", () => {
        expect(paramsEqual_1.default(new Boolean(true), new Boolean(true))).toBeTruthy();
        expect(paramsEqual_1.default(new Boolean(true), new Boolean(false))).toBeFalsy();
        expect(paramsEqual_1.default(new String("true"), new String("true"))).toBeTruthy();
        expect(paramsEqual_1.default(new String("true"), new String("false"))).toBeFalsy();
        expect(paramsEqual_1.default(new Object(), new Object())).toBeTruthy();
        expect(paramsEqual_1.default(new Object("true"), new Object("false"))).toBeFalsy();
    });
    it("should work for arrays", () => {
        expect(paramsEqual_1.default([], [])).toBeTruthy();
        expect(paramsEqual_1.default([""], [])).toBeFalsy();
        expect(paramsEqual_1.default([function () { }], [function () { }])).toBeTruthy();
        expect(paramsEqual_1.default({}, [])).toBeFalsy();
        expect(paramsEqual_1.default([{ hi: "hello" }], { hi: "hello" })).toBeFalsy();
    });
    it("should work for functions", () => {
        expect(paramsEqual_1.default(function () { }, function () { })).toBeTruthy();
        expect(paramsEqual_1.default(function hi() { }, function () { })).toBeFalsy();
        expect(paramsEqual_1.default(function () { }, () => { })).toBeFalsy();
        expect(paramsEqual_1.default(function () { }, function () { return false; })).toBeFalsy();
        expect(paramsEqual_1.default(function () {
            return __awaiter(this, void 0, void 0, function* () { });
        }, function () { })).toBeFalsy();
    });
    it("should work for dates", () => {
        const time1 = new Date();
        const time2 = new Date(12543745);
        expect(paramsEqual_1.default(time1, time1)).toBeTruthy();
        expect(paramsEqual_1.default(time1, time2)).toBeFalsy();
    });
    it("should work for objects", () => {
        expect(paramsEqual_1.default({}, {})).toBeTruthy();
        expect(paramsEqual_1.default({}, { hi: "hello" })).toBeFalsy();
        expect(paramsEqual_1.default({ hi: "hello" }, { hi: "hello" })).toBeTruthy();
        expect(paramsEqual_1.default({ hi: "hello" }, {})).toBeFalsy();
        expect(paramsEqual_1.default([{ hi: "hello" }, "hi"], [{ hi: "hello" }, "hi"])).toBeTruthy();
        expect(paramsEqual_1.default([{ hi: "hello" }], [{ hi: "hello" }, "hi"])).toBeFalsy();
        expect(paramsEqual_1.default({ hi: "hello" }, { hi: {} })).toBeFalsy();
        expect(paramsEqual_1.default({ hi: "hello" }, { hi: { hello: "hi" } })).toBeFalsy();
        expect(paramsEqual_1.default({ hi: {} }, { hi: { hello: "hi" } })).toBeFalsy();
        expect(paramsEqual_1.default({ hi: { hello: 1 } }, { hi: { hello: "1" } })).toBeFalsy();
    });
    it("should works with setters and getters", () => {
        const log = [];
        const setterGetter = {
            log,
            set yo(name) {
                this.log.push(name);
            },
            get yo() {
                return "this is set";
            }
        };
        const onlyGetter = {
            log,
            get yo() {
                return "this is set";
            }
        };
        const onlySetter = {
            log,
            set yo(name) {
                this.log.push(name);
            }
        };
        const normal = {
            log: [],
            yo: "this is set"
        };
        expect(paramsEqual_1.default(setterGetter, normal)).toBeFalsy();
        expect(paramsEqual_1.default(normal, setterGetter)).toBeFalsy();
        expect(paramsEqual_1.default(setterGetter, setterGetter)).toBeTruthy();
        expect(paramsEqual_1.default(onlySetter, setterGetter)).toBeFalsy();
        expect(paramsEqual_1.default(onlyGetter, setterGetter)).toBeFalsy();
        expect(paramsEqual_1.default(onlySetter, normal)).toBeFalsy();
        expect(paramsEqual_1.default(onlyGetter, normal)).toBeFalsy();
    });
    it("should throw error if there is infinite nested prop", () => {
        const a = { hi: "hello", s: {} };
        const b = { hi: "hello", s: {} };
        const c = { hi: "h", c: {} };
        c.c = c;
        a.s = a;
        b.s = c;
        expect(() => paramsEqual_1.default(a, b)).toThrow(new RangeError("You are not allowed to create infinite nest"));
    });
});
//# sourceMappingURL=paramsEqual.spec.js.map